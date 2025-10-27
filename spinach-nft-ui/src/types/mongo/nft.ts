import {NftInfoModel, NftTxnModel} from '@spinach/common/types/data/nft';


export type NftInfoMap = {[nftId in string]?: NftInfoModel};

export type NftPriceMap = {[nftId in string]: number};

export type NftTxnModelClient = Omit<NftTxnModel, 'from' | 'to' | 'nftId'> & {
  epochMs: number,
  from: string,
  to: string,
  nftId: string,
  id: string,
};
