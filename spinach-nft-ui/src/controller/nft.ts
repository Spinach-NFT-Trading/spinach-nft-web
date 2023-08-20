'use server';
import {nftInfoCollection, nftOnSaleCollection} from '@spinach/common/controller/collections/nft';
import {ObjectId} from 'mongodb';

import {NftInfoMap} from '@spinach/next/types/mongo/nft';


export const getNftOnSale = (nftId: ObjectId) => {
  return nftOnSaleCollection.findOne({id: nftId});
};

export const getNftOnSaleList = (limit: number) => {
  return nftOnSaleCollection.find({}, {limit, projection: {_id: false}});
};

export const getNftInfo = (nftId: ObjectId) => {
  return nftInfoCollection.findOne({_id: nftId});
};

export const getNftInfoMap = async (nftIds: ObjectId[]): Promise<NftInfoMap> => {
  const ret: NftInfoMap = {};

  for await (const nftInfo of nftInfoCollection.find({_id: {$in: nftIds}})) {
    ret[nftInfo._id.toString()] = nftInfo;
  }

  return ret;
};

export const recordNftTxn = () => {
  // TODO: Check balance, if enough: record txn and buy it; if not: exit
};