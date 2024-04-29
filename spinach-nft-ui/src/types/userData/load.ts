import {AccountIdVerificationType} from '@spinach/common/types/api/profile/id';


export type DataLookBackRequest = {
  startEpochMs: number,
  endEpochMs: number,
  ianaTimezone: string,
};

export type DataLookBackRequestOnUser = DataLookBackRequest & {
  userId: string,
};

export type UserDataLoadingOpts = {
  type: 'nftPosition',
  opts?: never,
} | {
  type: 'bankDetails',
  opts: {
    userId: string,
  },
} | {
  type: 'verifiedBankDetails',
  opts?: never,
} | {
  type: 'globalConfig',
  opts?: never,
} | {
  type: 'adminAgentList',
  opts: DataLookBackRequest,
} | {
  type: 'adminMemberList',
  opts: DataLookBackRequest & {
    agentId: string | null,
  },
} | {
  type: 'adminMemberNftTxn' | 'adminMemberBalanceDaily' | 'adminMemberBalanceDetails',
  opts: DataLookBackRequestOnUser,
} | {
  type: 'adminTokenList' | 'adminTokenGeneration',
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

export type UserDataLoadingType = UserDataLoadingOpts['type'];
