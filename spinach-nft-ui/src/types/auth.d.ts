import {DefaultSession, DefaultUser} from 'next-auth';
import {DefaultJWT} from 'next-auth/jwt';
import {UserInfo} from 'spinach-nft-common/types/common/user';


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
