import {
  nftImageCollection,
  nftInfoCollection,
  nftOnSaleCollection,
} from '@spinach/common/controller/collections/nft';
import {NftImageModel, NftInfoModel} from '@spinach/common/types/data/nft';
import {ObjectId} from 'mongodb';

import {seqIdDefaultStart} from '@spinach/service/controller/nft/const';


export const mintNewNft = (nft: NftInfoModel) => nftInfoCollection.insertOne(nft);

export const getNewSeqId = async () => {
  const newest = await nftInfoCollection.findOne({}, {sort: {seqId: 'desc'}});

  if (!newest) {
    return seqIdDefaultStart;
  }

  return newest.seqId + 1;
};

export const getRandomNftImage = async () => {
  return (await nftImageCollection.aggregate<NftImageModel>([{$sample: {size: 1}}]).toArray())[0].url;
};

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
