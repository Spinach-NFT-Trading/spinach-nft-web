import {getNftPriceTiers} from '@spinach/common/controller/actors/nft';

import {ensureInventoryOfTier} from '@spinach/service/worker/nft/tier';


const checkNftInventory = async () => {
  const tiers = await getNftPriceTiers();

  await Promise.all(tiers.map((tier) => ensureInventoryOfTier({tier})));
};

export const ensureNftInventoryCompleteness = () => {
  setInterval(() => {
    checkNftInventory().catch((err) => console.error('Failed to check NFT inventory', err));
  }, 10000);
};
