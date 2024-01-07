import {nftOnSaleCollection} from '@spinach/common/controller/collections/nft';
import {ObjectId} from 'mongodb';


export const getNftOnSale = (nftId: ObjectId) => {
  return nftOnSaleCollection.findOne({id: nftId});
};

export const getNftOnSaleList = (limit: number) => {
  return nftOnSaleCollection.find({}, {limit, projection: {_id: false}});
};
