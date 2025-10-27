import {ObjectId} from 'mongodb';

import {nftMinterAccountId} from '@spinach/common/const/nft';
import {nftInfoCollection} from '@spinach/common/controller/collections/nft';
import {generateNft} from '@spinach/common/controller/nft/list/generate';
import {putNftOnSale} from '@spinach/common/controller/nft/list/putOnSale';
import {NftInfoLimitedMeta} from '@spinach/common/types/data/nft';


type ListNftOpts = NftInfoLimitedMeta & {
  price: number,
};

export const listNft = async ({price, ...limitedMeta}: ListNftOpts) => {
  const newNft = await generateNft(limitedMeta);
  const insertResult = await nftInfoCollection.insertOne(newNft);

  console.log(`New NFT [${insertResult.insertedId}] minted and put on sale for ${price} GOLD`);

  return putNftOnSale({
    seller: new ObjectId(nftMinterAccountId),
    nftId: insertResult.insertedId,
    price,
  });
};
