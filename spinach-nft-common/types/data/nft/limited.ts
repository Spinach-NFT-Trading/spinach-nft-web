import {ObjectId} from 'mongodb';


export type NftLimitedPendingModel = {
  nftId: ObjectId,
  buyer: ObjectId,
};
