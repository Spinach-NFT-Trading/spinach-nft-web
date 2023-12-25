import {GoldExchangeChannel} from '@spinach/common/types/data/gold/common';


export type GoldWalletClientCommon = {
  id: string,
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

export type GoldWalletTwBankClient = GoldWalletTwBank & GoldWalletClientCommon;

export type GoldWallet =
  GoldWalletCrypto |
  GoldWalletTwBank;

export type GoldWalletClient = GoldWallet & GoldWalletClientCommon;

export type GoldWalletClientMap = {[id in string]?: GoldWalletClient};

export type GoldWalletClientTypeMap = {
  crypto: GoldWalletCrypto,
  twBank: GoldWalletTwBank,
} & {
  [channel in GoldExchangeChannel]: GoldWalletClientCommon
};

// For checking if `GoldWalletClientTypeMap` implements every possible `GoldExchangeChannel`
// noinspection JSUnusedLocalSymbols
type _ = GoldWalletClientTypeMap[GoldExchangeChannel];
