import {ApiErrorCode} from '@spinach/common/types/api/error';
import {UserInfo} from '@spinach/common/types/common/user';
import {DefaultSession, DefaultUser} from 'next-auth';
import {DefaultJWT} from 'next-auth/jwt';

import {UserPreloadedData} from '@spinach/next/types/userData/main';


type CommonUserData = {
  username: UserInfo['username'],
  jwtUpdateError: ApiErrorCode | null,
};

type SessionUserAddons = CommonUserData & {
  preloaded: UserPreloadedData | null,
};

declare module 'next-auth' {
  interface User extends DefaultUser, UserInfo {}

  interface Session {
    user: DefaultSession['user'] & SessionUserAddons;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT, CommonUserData {}
}
