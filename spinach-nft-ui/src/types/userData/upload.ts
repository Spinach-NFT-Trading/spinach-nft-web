import {AccountVerifySmsCode} from '@spinach/next/types/mongo/account/verify';


export type RequestOptsOfNftBuy = {
  nftId: string,
};

export type RequestOptsOfVerifySmsPending = {
  phone: string,
};

export type RequestOptsOfVerifySmsComplete = {
  code: AccountVerifySmsCode,
};

export type UserDataRequestOpts = {
  type: 'nftBuy',
  data: RequestOptsOfNftBuy,
} | {
  type: 'exchangeGold',
  data: null,
} | {
  type: 'verify.sms.phone',
  data: RequestOptsOfVerifySmsPending,
} | {
  type: 'verify.sms.code',
  data: RequestOptsOfVerifySmsComplete,
};
