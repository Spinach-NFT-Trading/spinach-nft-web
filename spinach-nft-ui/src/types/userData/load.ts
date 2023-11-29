import {AccountIdVerificationType} from '@spinach/common/types/api/profile/id';


export type UserDataLoadingOpts = {
  type: 'nftPosition',
  opts?: never,
} | {
  type: 'userInfo',
  opts?: never,
} | {
  type: 'userBankDetails',
  opts?: never,
} | {
  type: 'adminUnverifiedAccounts',
  opts?: never,
} | {
  type: 'adminImageOfId',
  opts: {
    type: AccountIdVerificationType,
    userId: string,
  },
};

export type UserDataLoader = (options: UserDataLoadingOpts) => void;
