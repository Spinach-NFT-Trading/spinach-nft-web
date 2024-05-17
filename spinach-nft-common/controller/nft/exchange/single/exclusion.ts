import {ObjectId} from 'mongodb';

import {nftExchangeMatchedCollection} from '@spinach/common/controller/collections/nft';


export const getNftExchangeTargetExclusion = async (): Promise<ObjectId[]> => {
  return await nftExchangeMatchedCollection.find().map(({nftId}) => nftId).toArray();
};
