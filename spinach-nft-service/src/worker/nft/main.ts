import {NftMinterAccount} from '@spinach/common/const/nft';
import {getOnSaleNftCount} from '@spinach/common/controller/actors/nft';

import {mintNewNft, putNftOnSale} from '@spinach/service/controller/nft/main';
import {generateNft, generateSalePrice} from '@spinach/service/controller/nft/utils';
import {nftOnSaleMinimum} from '@spinach/service/env';


const checkNftInventory = async () => {
  const onSaleNftCount = await getOnSaleNftCount();

  if (onSaleNftCount >= nftOnSaleMinimum) {
    // Already enough NFT on sale
    return;
  }

  const nftNeededToFill = nftOnSaleMinimum - onSaleNftCount;

  for (const _ of Array(nftNeededToFill).keys()) {
    const newNft = generateNft();
    const insertResult = await mintNewNft(newNft);
    const price = generateSalePrice();

    console.log(`New NFT [${insertResult.insertedId}] minted and put on sale for ${price} GOLD`);

    await putNftOnSale({
      seller: NftMinterAccount,
      nftId: insertResult.insertedId,
      price,
    });
  }
};

export const ensureNftInventoryFull = () => {
  setInterval(() => {
    checkNftInventory().catch((err) => console.error('Failed to check NFT inventory', err));
  }, 10000);
};
