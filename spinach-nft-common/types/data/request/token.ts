import {ObjectId} from 'mongodb';


export type TxnRequestTokenModel = {
  accountId: ObjectId,
  token: string,
};
