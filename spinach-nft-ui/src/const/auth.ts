import {MongoDBAdapter as mongoDBAdapter} from '@next-auth/mongodb-adapter';
import * as env from 'env-var';
import {AuthOptions} from 'next-auth';
import credentialsProvider, {CredentialInput} from 'next-auth/providers/credentials';
import {apiPath} from 'spinach-nft-common/const/path';
import {UserLoginRequest, UserLoginResponse} from 'spinach-nft-common/type/api/auth/login';

import mongoPromise from '@/lib/mongodb';


const authApi = env.get('NEXTAUTH_AUTH_API').required().asString();

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: mongoDBAdapter(
    mongoPromise,
    {databaseName: 'auth'},
  ),
  providers: [
    credentialsProvider({
      id: 'Spinach',
      type: 'credentials',
      credentials: {
        account: {label: 'username', type: 'text'},
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
        const response = await resp.json() satisfies UserLoginResponse;

        if (!response.success) {
          throw new Error(response.error);
        }

        return response;
      },
    }),
  ],
};
