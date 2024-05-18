import {NftInfoModel} from '@spinach/common/types/data/nft';
import {NftExchangeMatchedModel} from '@spinach/common/types/data/nft/match';


export type NftListingData = NftInfoModel & {
  id: string,
  price: number,
};

export type NftExchangeMatchedModelAtClient = Omit<NftExchangeMatchedModel, 'nftId'> & {
  nftId: string,
};
