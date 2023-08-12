import {ApiErrorCode} from '@spinach/common/types/api/error';
import {UserInfo} from '@spinach/common/types/common/user';
import {DefaultSession, DefaultUser} from 'next-auth';
import {DefaultJWT} from 'next-auth/jwt';


declare module 'next-auth' {
  interface User extends DefaultUser, UserInfo {}

  interface Session {
    user: DefaultSession['user'] & {
      username: UserInfo['username'],
      jwtUpdateError: ApiErrorCode | null,
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    username: UserInfo['username'],
    jwtUpdateError: ApiErrorCode | null,
  }
}
