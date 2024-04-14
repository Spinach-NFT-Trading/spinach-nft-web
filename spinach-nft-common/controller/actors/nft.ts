import {defaultNftPriceTiers} from '@spinach/common/const/nft';
import {nftPriceTierCollection} from '@spinach/common/controller/collections/nft';
import {NftPriceTierModel} from '@spinach/common/types/data/nft';


export const getNftPriceTiers = async (): Promise<NftPriceTierModel[]> => {
  const tiers = await nftPriceTierCollection.find().toArray();

  // Price tiers not set up, insert default ones
  if (!tiers.length) {
    await nftPriceTierCollection.insertMany(defaultNftPriceTiers);
    return defaultNftPriceTiers;
  }

  return tiers;
};
