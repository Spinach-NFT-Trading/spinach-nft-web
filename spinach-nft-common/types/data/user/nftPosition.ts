import {ObjectId} from 'mongodb';


export type UserNftPositionModel = {
  owner: ObjectId,
  nftId: ObjectId,
};
