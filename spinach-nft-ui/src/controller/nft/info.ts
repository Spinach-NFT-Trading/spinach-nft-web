import {nftInfoCollection} from '@spinach/common/controller/collections/nft';
import {ObjectId} from 'mongodb';

import {NftInfoMap} from '@spinach/next/types/mongo/nft';


export const getNftInfo = (nftId: ObjectId) => {
  return nftInfoCollection.findOne({_id: nftId});
};

export const getNftInfoMultiple = (nftIds: ObjectId[]) => {
  return nftInfoCollection.find({_id: {$in: nftIds}});
};

export const getNftInfoMap = async (nftIds: ObjectId[]): Promise<NftInfoMap> => {
  const ret: NftInfoMap = {};

  for await (const nftInfo of getNftInfoMultiple(nftIds)) {
    const {_id, ...info} = nftInfo;
    ret[nftInfo._id.toString()] = info;
  }

  return ret;
};
