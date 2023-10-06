import {AccountVerifySmsCode} from '@spinach/next/types/mongo/account/verify';


export type RequestOptsOfNftBuy = {
  nftId: string,
};

export type UserDataRequestOpts = {
  type: 'nftBuy',
  data: RequestOptsOfNftBuy,
} | {
  type: 'exchangeGold',
  data: null,
} | {
  type: 'verify.sms.phone',
  data: string,
} | {
  type: 'verify.sms.code',
  data: AccountVerifySmsCode,
};
