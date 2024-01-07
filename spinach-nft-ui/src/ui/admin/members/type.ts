import {UserInfo} from '@spinach/common/types/common/user';


export type AdminMembersFilterInput = Pick<
  UserInfo,
  'idNumber' | 'username' | 'name' | 'email' | 'lineId' | 'wallet'
> & {
  bankAccount: string,
};

