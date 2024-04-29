import {UserIdVerificationData} from '@spinach/common/types/api/auth/verify/id/main';
import {BinaryData} from '@spinach/common/types/common/binary';
import {UserCommissionPercent} from '@spinach/common/types/common/user/commission';
import {GlobalConfig} from '@spinach/common/types/data/global';
import {BankDetails} from '@spinach/common/types/data/user/bank';


export type RequestOptsOfNftBuy = {
  nftId: string,
};

export type RequestOfUserBankDetails = {
  image: BinaryData,
  details: Omit<BankDetails, 'uuid'>,
};

export type RequestOfGoldExchangeTwBank = {
  sourceBankDetailsUuid: string,
  txnProofImage: BinaryData,
  targetWalletId: string,
  amount: number,
};

export type UserDataRequestOpts = {
  type: 'session.poll',
  data?: never,
} | {
  type: 'nft.buy',
  data: RequestOptsOfNftBuy,
} | {
  type: 'user.bank',
  data: RequestOfUserBankDetails,
} | {
  type: 'user.account.verify.id',
  data: UserIdVerificationData,
} | {
  type: 'exchange.gold.crypto',
  data: null,
} | {
  type: 'exchange.gold.twBank',
  data: RequestOfGoldExchangeTwBank,
} | {
  type: 'admin.agent.update.commission',
  data: {
    agentId: string | null,
    commissionPercent: UserCommissionPercent,
  },
} | {
  type: 'admin.token.delete',
  data: {
    token: string,
  },
} | {
  type: 'admin.member.mark.agent',
  data: {
    targetId: string,
    isAgent: boolean,
  },
} | {
  type: 'admin.member.mark.suspended',
  data: {
    targetId: string,
    isSuspended: boolean,
  },
} | {
  type: 'admin.member.update.commission',
  data: {
    targetId: string,
    commissionPercent: UserCommissionPercent,
  },
} | {
  type: 'admin.verify.account',
  data: {
    targetId: string,
    pass: boolean,
  },
} | {
  type: 'admin.verify.bank' | 'admin.verify.gold.twBank',
  data: {
    targetUuid: string,
    pass: boolean,
  },
} | {
  type: 'admin.config.update',
  data: GlobalConfig,
};
