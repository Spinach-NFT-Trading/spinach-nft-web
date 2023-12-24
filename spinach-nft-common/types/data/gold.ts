import {ObjectId} from 'mongodb';


export type GoldTrackedTxn = {
  amount: number,
  decimals: number,
  hash: string,
  from: string,
  to: string,
  blockEpoch: number,
};

export type GoldCompletedTxn = GoldTrackedTxn & {
  accountId: ObjectId,
  fx: string,
  goldEquivalent: number,
};

export type GoldWalletCrypto = {
  channel: 'crypto',
  wallet: string,
};

export type GoldWalletTwBank = {
  channel: 'twBank',
  code: string,
  account: string,
};

export type GoldWallet =
  GoldWalletCrypto |
  GoldWalletTwBank;

export type GoldWalletTypeMap = {
  crypto: GoldWalletCrypto,
  twBank: GoldWalletTwBank,
};

export type GoldExchangeChannel = keyof GoldWalletTypeMap;
