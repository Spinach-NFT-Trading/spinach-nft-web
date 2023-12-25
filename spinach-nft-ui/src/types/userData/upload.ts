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
  type: 'nftBuy',
  data: RequestOptsOfNftBuy,
} | {
  type: 'userBankDetails',
  data: RequestOfUserBankDetails,
} | {
  type: 'exchangeGold',
  data: null,
} | {
  type: 'exchangeGoldTwBank',
  data: RequestOfGoldExchangeTwBank,
} | {
  type: 'adminVerifyAccount',
  data: {
    targetId: string,
  },
} | {
  type: 'adminVerifyBankDetails' | 'adminVerifyGoldTxnTwBank',
  data: {
    targetUuid: string,
  },
};
