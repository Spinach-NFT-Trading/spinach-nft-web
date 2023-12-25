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
