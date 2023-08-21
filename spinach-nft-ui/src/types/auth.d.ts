import {ApiErrorCode} from '@spinach/common/types/api/error';
import {UserInfo} from '@spinach/common/types/common/user';
import {DefaultSession, DefaultUser} from 'next-auth';
import {DefaultJWT} from 'next-auth/jwt';

import {UserLazyLoadedData, UserPreloadedData} from '@spinach/next/types/userData/main';


export type CommonUserData = {
  username: UserInfo['username'],
  jwtUpdateError: ApiErrorCode | null,
  preloaded: UserPreloadedData | null,
  lazyLoaded: UserLazyLoadedData,
};

declare module 'next-auth' {
  interface User extends DefaultUser, UserInfo {}

  interface Session {
    user: DefaultSession['user'] & CommonUserData;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT, CommonUserData {}
}
