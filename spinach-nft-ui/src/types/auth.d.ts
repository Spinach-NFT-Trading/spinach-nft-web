import {ApiErrorCode} from '@spinach/common/types/api/error';
import {UserInfo} from '@spinach/common/types/common/user';
import {DefaultSession, DefaultUser} from 'next-auth';
import {DefaultJWT} from 'next-auth/jwt';

import {UserDataAction, UserLazyLoadedData, UserPreloadedData} from '@spinach/next/types/userData/main';


export type CommonUserData = {
  id: string,
  username: UserInfo['username'],
  verified: boolean,
  isAdmin: boolean,
};

declare module 'next-auth' {
  interface User extends DefaultUser, UserInfo {}

  interface Session {
    user: DefaultSession['user'] & CommonUserData & {
      jwtUpdateError: ApiErrorCode | null,
      preloaded: UserPreloadedData | null,
      lazyLoaded: UserLazyLoadedData,
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT, CommonUserData {
    action: UserDataAction | null;
  }
}
