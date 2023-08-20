import {apiPath} from '@spinach/common/const/path';
import {UserLoginRequest, UserLoginResponse} from '@spinach/common/types/api/auth/login';
import * as env from 'env-var';
import {AuthOptions} from 'next-auth';
import credentialsProvider, {CredentialInput} from 'next-auth/providers/credentials';

import {handleUserLoad} from '@spinach/next/controller/userData/load';
import {handleUserRequest} from '@spinach/next/controller/userData/request';
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
      }

      const accountId = token.sub;
      const {action, options} = session as UserDataAction;

      if (trigger === 'update' && accountId) {
        if (action === 'request') {
          token.jwtUpdateError = await handleUserRequest({accountId, options});
          return token;
        }

        if (action === 'load') {
          await handleUserLoad({accountId, options});
          return token;
        }

        console.error(`Unhandled user data action [${action satisfies never}]`);
      }

      return token;
    },
    session: async ({session, token}) => {
      // Needs to add the properties on `token` JWT, or it won't be exposed to the UI
      session.user.username = token.username;
      session.user.jwtUpdateError = token.jwtUpdateError;

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
