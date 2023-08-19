import {nftInfoCollection, nftOnSaleCollection} from '@spinach/common/controller/nft';
import {NftInfoModel} from '@spinach/common/types/data/nft';
import {ObjectId} from 'mongodb';


export const getOnSaleNftCount = () => nftOnSaleCollection.countDocuments({});

export const mintNewNft = (nft: NftInfoModel) => nftInfoCollection.insertOne(nft);

export const putNftOnSale = (nftId: ObjectId, price: number) => nftOnSaleCollection.insertOne({
  id: nftId,
  price,
});
