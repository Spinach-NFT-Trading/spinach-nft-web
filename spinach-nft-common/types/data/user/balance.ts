import {ObjectId} from 'mongodb';


export type UserBalanceHistoryModelRequired = {
  userId: ObjectId,
  diff: number,
  current: number,
};

export type UserBalanceHistoryModel = UserBalanceHistoryModelRequired & ({
  type: 'deposit',
  txnHash: string,
} | {
  type: 'nftBuy',
  nftTxnId: ObjectId,
} | {
  type: 'nftSell',
  nftTxnId: ObjectId,
});
