export type RequestOptsOfNftBuy = {
  nftId: string,
};

export type UserDataRequestOpts = {
  type: 'nftBuy',
  data: RequestOptsOfNftBuy,
} | {
  type: 'exchangeGold',
  data: null,
};
