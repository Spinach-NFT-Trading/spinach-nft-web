import {AccountIdVerificationType} from '@spinach/common/types/api/profile/id';


export type UserDataLoadingOpts = {
  type: 'nftPosition',
  opts?: never,
} | {
  type: 'verifiedBankDetails',
  opts?: never,
} | {
  type: 'adminUnverifiedAccounts',
  opts?: never,
} | {
  type: 'adminUnverifiedBankDetails',
  opts?: never,
} | {
  type: 'adminUnverifiedGoldTxn',
  opts?: never,
} | {
  type: 'adminImageOfId',
  opts: {
    type: AccountIdVerificationType,
    userId: string,
  },
} | {
  type: 'adminImageOfBankDetails' | 'adminImageOfGoldTxnTwBank',
  opts: {
    uuid: string,
  },
};

export type UserDataLoader = (options: UserDataLoadingOpts) => void;

export type UserDataLoadingType = UserDataLoadingOpts['type'];
