import {ObjectId} from 'mongodb';


export type NftInfoModel = {
  seqId: number,
  tokenId: number,
  maker: string,
  image: string,
  isLimited: boolean,
};

export type NftOnSaleModel = {
  seller: ObjectId,
  id: ObjectId,
  price: number,
};

export type NftPriceTierModel = {
  price: number,
  quantity: number,
};

export type NftTxnModel = {
  from: ObjectId,
  to: ObjectId,
  nftId: ObjectId,
  price: number,
};

export type NftImageModel = {
  url: string,
};
