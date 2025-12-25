import {TokenFeeConfig as CommonTokenFeeConfig} from "@spinach/common/types/data/nft/token";


export type TokenFeeRate = {
  rate: number,
  flat: number,
};

export type TokenFeeConfig = CommonTokenFeeConfig;

export type Token = {
  token: string,
  webhook: string,
  note?: string,
  accountId: string,
  fee?: TokenFeeConfig,
};
