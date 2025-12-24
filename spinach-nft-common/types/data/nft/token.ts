import {ObjectId} from 'mongodb';


export type TokenFeeRate = {
  rate: number,
  flat: number,
};

export type TokenFeeConfig = {
  inflow: TokenFeeRate,
  outflow: TokenFeeRate,
};

export type NftExchangeToken = {
  token: string,
  webhook: string,
  note?: string,
  fee?: TokenFeeConfig,
};

export type NftExchangeTokenModel = NftExchangeToken & {
  accountId: ObjectId,
};

export type NftExchangeTokenMap = {[token in string]?: NftExchangeToken};
