import {apiPath} from '@spinach/common/const/path';
import {UserLoginRequest, UserLoginResponse} from '@spinach/common/types/api/auth/login';
import * as env from 'env-var';
import {AuthOptions} from 'next-auth';
import credentialsProvider, {CredentialInput} from 'next-auth/providers/credentials';

import {handleUserLoad} from '@spinach/next/controller/act/load';
import {getUserPreloadedData} from '@spinach/next/controller/act/preload';
import {handleUserRequest} from '@spinach/next/controller/act/request';
import {getUserInfoById} from '@spinach/next/controller/user/info';
import {UserDataAction} from '@spinach/next/types/userData/main';


const authApi = env.get('NEXT_PUBLIC_SERVER_API').required().asString();

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt: async ({token, user, trigger, session}) => {
      const accountId = token.sub;

      if (!accountId) {
        throw new Error('Failed to create JWT as `token.sub` is falsy');
      }

      // Fetch the user info on the fly because according to the doc,
      // `user` is only available on the first call when a new session is created.
      // `user` will be unavailable for the subsequent calls.
      // https://next-auth.js.org/configuration/callbacks#jwt-callback
      const userInfo = user ?? await getUserInfoById(accountId);
      if (!userInfo) {
        throw new Error('Failed to create JWT as `userInfo` is empty');
      }

      const {
        username,
        name,
        email,
        admin,
        agent,
        status,
      } = userInfo;
      token = {
        id: token.id,
        sub: token.sub,
        username,
        name,
        email,
        isAdmin: admin,
        isAgent: agent,
        status,
        jwtUpdateError: null,
        action: null,
      };

      if (trigger === 'update' && accountId) {
        const {action, options} = session as UserDataAction;

        if (action === 'request') {
          token.jwtUpdateError = await handleUserRequest({accountId, options});
        } else if (action === 'load') {
          token.action = session;
        } else {
          console.error(`Unhandled user data action [${action satisfies never}]`);
        }
      }

      return token;
    },
    session: async ({session, token}) => {
      // Can't use `trigger` here as it's always `undefined`
      const accountId = token.sub;

      let lazyLoaded = {};
      if (token.action && accountId) {
        const {action, options} = token.action;

        if (action === 'load') {
          lazyLoaded = await handleUserLoad({
            accountId,
            options,
          });
        }
      }

      if (!accountId) {
        throw new Error('Failed to create session as `token.sub` is falsy');
      }

      session.user = {
        id: accountId,
        preloaded: await getUserPreloadedData(token.sub),
        username: token.username,
        status: token.status,
        jwtUpdateError: token.jwtUpdateError,
        lazyLoaded,
        isAdmin: token.isAdmin,
        isAgent: token.isAgent,
      };

      return session;
    },
  },
  pages: {
    signIn: '/account/login',
    error: '/account/login',
  },
  providers: [
    credentialsProvider({
      id: 'Spinach',
      type: 'credentials',
      credentials: {
        username: {label: 'username', type: 'text'},
        password: {label: 'password', type: 'password'},
      } satisfies Record<keyof UserLoginRequest, CredentialInput>,
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        const resp = await fetch(`${authApi}${apiPath.auth.login}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
        const response = await resp.json() as UserLoginResponse;

        if (!response.success) {
          throw new Error(response.error);
        }

        return response.data;
      },
    }),
  ],
};
