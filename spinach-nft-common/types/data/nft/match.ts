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
  completedAt: Date | null,
};

export type NftExchangeMatchedData = Omit<NftExchangeMatchedModel, 'nftId' | 'completedAt'> & {
  nftId: string,
  matchedAtEpochMs: number,
};
