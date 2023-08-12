import {UserInfo} from '@spinach/common/types/common/user';
import {DefaultSession, DefaultUser} from 'next-auth';
import {DefaultJWT} from 'next-auth/jwt';


declare module 'next-auth' {
  interface User extends DefaultUser, UserInfo {}

  interface Session {
    user: DefaultSession['user'] & UserInfo;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    username: UserInfo['username'],
  }
}
