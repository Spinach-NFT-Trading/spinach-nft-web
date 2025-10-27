import {ObjectId} from 'mongodb';

import {nftOnSaleCollection} from '@spinach/common/controller/collections/nft';


type PutNftOnSaleOpts = {
  seller: ObjectId,
  nftId: ObjectId,
  price: number
};

export const putNftOnSale = ({nftId, seller, price}: PutNftOnSaleOpts) => nftOnSaleCollection.insertOne({
  id: nftId,
  seller,
  price,
});
