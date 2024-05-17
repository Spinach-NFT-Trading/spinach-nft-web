import {ObjectId} from 'mongodb';


export type NftExchangeMatchedModel = {
  requestUuid: string,
  token: string,
  amount: {
    requested: number,
    matched: number,
    refunded: number,
  },
  nftId: ObjectId,
  bankDetailsUuid: string[],
};
