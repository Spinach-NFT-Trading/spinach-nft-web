import {ObjectId} from 'mongodb';


export type NftInfoModel = {
  seqId: number,
  image: string,
  isLimited: boolean,
};

export type NftOnSaleModel = {
  seller: ObjectId,
  id: ObjectId,
  price: number,
};

export type NftTxnModel = {
  from: ObjectId,
  to: ObjectId,
  nftId: ObjectId,
  price: number,
};
