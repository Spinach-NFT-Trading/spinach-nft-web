import {AccountIdVerificationType} from '@spinach/common/types/api/profile/id';
import {IsoDateString} from '@spinach/common/types/common/date';


export type DataLookBackRequest = {
  startDate: IsoDateString,
  endDate: IsoDateString,
};

export type DataLookBackRequestOnUser = DataLookBackRequest & {
  userId: string,
};

export type UserDataLoadingOpts = {
  type: 'nftPosition',
  opts?: never,
} | {
  type: 'verifiedBankDetails',
  opts?: never,
} | {
  type: 'adminMemberList',
  opts: DataLookBackRequest,
} | {
  type: 'adminMemberBalanceSummary',
  opts: {
    request: DataLookBackRequest,
    targetUserIds: string[],
  },
} | {
  type: 'adminMemberNftTxn' | 'adminMemberBalanceDaily' | 'adminMemberBalanceDetails',
  opts: DataLookBackRequestOnUser,
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
