import {UserIdVerificationUploadIdMap} from '@spinach/common/types/api/auth/register';
import {UserCommissionPercent} from '@spinach/common/types/common/user/commission';
import {GlobalConfig} from '@spinach/common/types/data/global';
import {NftExchangeToken} from '@spinach/common/types/data/nft/token';
import {BankDetails} from '@spinach/common/types/data/user/bank';


export type RequestOfUserBankDetails = {
  details: Omit<BankDetails, 'uuid' | 'imageUploadId'>,
  imageUploadId: string,
};

export type RequestOfGoldExchangeTwBank = {
  sourceBankDetailsUuid: string,
  txnProofImageId: string,
  targetWalletId: string,
  amount: number,
};

export type UserDataRequestOpts = {
  type: 'nft.buy',
  data: {
    nftId: string,
  },
} | {
  type: 'nft.sell',
  data: {
    matchRequestUuid: string,
  },
} | {
  type: 'user.bank',
  data: RequestOfUserBankDetails,
} | {
  type: 'user.account.verify.id',
  data: UserIdVerificationUploadIdMap,
} | {
  type: 'exchange.gold.crypto',
  data: null,
} | {
  type: 'exchange.gold.twBank',
  data: RequestOfGoldExchangeTwBank,
} | {
  type: 'admin.token.update',
  data: NftExchangeToken,
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
  type: 'admin.commission.update.agent' | 'admin.commission.update.member',
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
  type: 'admin.verify.bank' | 'admin.verify.gold.twBank' | 'admin.verify.limitedNft',
  data: {
    targetUuid: string,
    pass: boolean,
  },
} | {
  type: 'admin.member.setPassword',
  data: {
    memberId: string,
    password: string,
  },
} | {
  type: 'admin.config.update',
  data: GlobalConfig,
};
