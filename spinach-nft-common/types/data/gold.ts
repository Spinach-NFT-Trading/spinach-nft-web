import {ObjectId} from 'mongodb';


export type GoldPendingExchange = {
  accountId: ObjectId,
  wallet: string,
  expiry: Date,
};

export type GoldCompletedExchange = GoldPendingExchange & {
  amount: number,
  hash: string,
  completedEpoch: number,
};
