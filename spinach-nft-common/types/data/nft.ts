import {ObjectId} from 'mongodb';


export type NftInfoModel = {
  image: string,
};

export type NftOnSaleModel = {
  id: ObjectId,
  price: number,
};

export type NftTxnModel = {
  from: ObjectId,
  to: ObjectId,
  price: number,
};