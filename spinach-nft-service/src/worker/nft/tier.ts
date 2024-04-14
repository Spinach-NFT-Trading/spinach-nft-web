import {nftOnSaleCollection} from '@spinach/common/controller/collections/nft';
import {NftPriceTierModel} from '@spinach/common/types/data/nft';

import {listNft} from '@spinach/service/worker/nft/list';


type EnsureInventoryOfTierOpts = {
  tier: NftPriceTierModel,
};

export const ensureInventoryOfTier = async ({
  tier,
}: EnsureInventoryOfTierOpts) => {
  const {price, quantity} = tier;

  const nftOnSaleOfPrice = await nftOnSaleCollection.countDocuments({price});

  await Promise.all([...Array(quantity - nftOnSaleOfPrice).keys()].map(() => listNft({price})));
};
