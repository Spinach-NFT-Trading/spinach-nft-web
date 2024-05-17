import {nftMinterAccountId} from '@spinach/common/const/nft';
import {ObjectId} from 'mongodb';

import {mintNewNft, putNftOnSale} from '@spinach/service/controller/nft/main';
import {generateNft} from '@spinach/service/controller/nft/utils';


type ListNftOpts = {
  price: number,
};

export const listNft = async ({price}: ListNftOpts) => {
  const newNft = await generateNft();
  const insertResult = await mintNewNft(newNft);

  console.log(`New NFT [${insertResult.insertedId}] minted and put on sale for ${price} GOLD`);

  await putNftOnSale({
    seller: new ObjectId(nftMinterAccountId),
    nftId: insertResult.insertedId,
    price,
  });
};
