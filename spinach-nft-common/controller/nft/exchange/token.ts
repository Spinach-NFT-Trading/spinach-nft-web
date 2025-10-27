import {nftExchangeTokenCollection} from '@spinach/common/controller/collections/nft';


export type ValidateNftExchangeTokenOpts = {
  token: string,
};

export const validateNftExchangeToken = async ({
  token,
}: ValidateNftExchangeTokenOpts): Promise<boolean> => {
  const tokenDoc = await nftExchangeTokenCollection.findOne({token});
  return tokenDoc !== null;
};
