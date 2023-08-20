import {nftInfoCollection, nftOnSaleCollection} from '@spinach/common/controller/collections/nft';
import {NftInfoModel} from '@spinach/common/types/data/nft';
import {ObjectId} from 'mongodb';


export const mintNewNft = (nft: NftInfoModel) => nftInfoCollection.insertOne(nft);

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
