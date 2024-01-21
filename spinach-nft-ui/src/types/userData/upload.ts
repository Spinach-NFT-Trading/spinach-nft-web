import {UserIdVerificationData} from '@spinach/common/types/api/auth/verify/id/main';
import {BinaryData} from '@spinach/common/types/common/binary';
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
  type: 'admin.verify.account',
  data: {
    targetId: string,
  },
} | {
  type: 'admin.verify.bank' | 'admin.verify.gold.twBank',
  data: {
    targetUuid: string,
    pass: boolean,
  },
};
