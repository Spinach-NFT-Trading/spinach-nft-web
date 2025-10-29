import {nftExchangeTokenCollection} from '@spinach/common/controller/collections/nft';
import {NftExchangeTokenModel} from '@spinach/common/types/data/nft/token';


export type GetNftExchangeTokenOpts = {
  token: string,
};

export const getNftExchangeToken = async ({
  token,
}: GetNftExchangeTokenOpts): Promise<NftExchangeTokenModel | null> => {
  return await nftExchangeTokenCollection.findOne({token});
};
