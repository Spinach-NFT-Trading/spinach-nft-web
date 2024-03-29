import {ObjectId} from 'mongodb';


export type GoldTrackedTxn = {
  amount: number,
  decimals: number,
  hash: string,
  from: string,
  to: string,
  blockEpoch: number,
};

export type GoldCompletedTxn = GoldTrackedTxn & {
  accountId: ObjectId,
  fx: string,
  goldEquivalent: number,
};
