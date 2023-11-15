import {apiPath} from '@spinach/common/const/path';
import {UserLoginRequest, UserLoginResponse} from '@spinach/common/types/api/auth/login';
import * as env from 'env-var';
import {AuthOptions} from 'next-auth';
import credentialsProvider, {CredentialInput} from 'next-auth/providers/credentials';

import {handleUserLoad} from '@spinach/next/controller/act/load';
import {getUserPreloadedData} from '@spinach/next/controller/act/preload';
import {handleUserRequest} from '@spinach/next/controller/act/request';
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
      if (user) {
        token.username = user.username;
        token.name = user.name;
        token.email = user.email;
        token.isAdmin = user.admin;
        token.verified = user.verified;
      }

      token.action = (trigger === 'update' && token.sub) ? (session as UserDataAction) : null;

      return token;
    },
    session: async ({session, token}) => {
      // Can't use `trigger` here as it's always `undefined`
      const accountId = token.sub;

      if (token.action && accountId) {
        const {action, options} = token.action;

        if (action === 'request') {
          session.user.jwtUpdateError = await handleUserRequest({accountId, options});
        } else if (action === 'load') {
          session.user.lazyLoaded = await handleUserLoad({
            initialData: session.user.lazyLoaded,
            accountId,
            type: options.type,
          });
        } else {
          console.error(`Unhandled user data action [${action satisfies never}]`);
        }
      }

      session.user = {
        ...session.user,
        preloaded: await getUserPreloadedData(token.sub),
        username: token.username,
        verified: token.verified,
        isAdmin: token.isAdmin,
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
