import {AccountIdVerificationType} from '@spinach/common/types/api/profile/id';


export type UserDataLoadingOpts = {
  type: 'nftPosition',
  opts?: never,
} | {
  type: 'adminUnverifiedAccounts',
  opts?: never,
} | {
  type: 'adminUnverifiedBankDetails',
  opts?: never,
} | {
  type: 'adminImageOfId',
  opts: {
    type: AccountIdVerificationType,
    userId: string,
  },
} | {
  type: 'adminImageOfBank',
  opts: {
    uuid: string,
  },
};

export type UserDataLoader = (options: UserDataLoadingOpts) => void;
