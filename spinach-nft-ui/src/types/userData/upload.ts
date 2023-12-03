import {BinaryData} from '@spinach/common/types/common/binary';
import {BankDetails} from '@spinach/common/types/data/user/bank';


export type RequestOptsOfNftBuy = {
  nftId: string,
};

export type RequestOfUserBankDetails = {
  image: BinaryData,
  details: BankDetails,
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
  type: 'adminVerifyAccount',
  data: {
    targetId: string,
  },
} | {
  type: 'adminVerifyBankDetails',
  data: {
    targetUuid: string,
  },
};
