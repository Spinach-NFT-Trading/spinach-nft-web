import {nftOnSaleCollection} from '@spinach/common/controller/collections/nft';
import {listNft} from '@spinach/common/controller/nft/list/mint';
import {NftPriceTierModel} from '@spinach/common/types/data/nft';


type EnsureInventoryOfTierOpts = {
  tier: NftPriceTierModel,
};

export const ensureInventoryOfTier = async ({
  tier,
}: EnsureInventoryOfTierOpts) => {
  const {price, quantity} = tier;

  const nftOnSaleOfPrice = await nftOnSaleCollection.countDocuments({price});

  await Promise.all([
    ...Array(quantity - nftOnSaleOfPrice).keys()].map(() => listNft({price, isLimited: false})),
  );
};
