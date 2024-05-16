import {ObjectId} from 'mongodb';


export type NftExchangeTokenModel = {
  accountId: ObjectId,
  token: string,
};
