import {ObjectId} from 'mongodb';


export type UserBalanceHistoryModelRequired = {
  userId: ObjectId,
  diff: number,
  current: number,
};

export type UserBalanceHistoryModel = UserBalanceHistoryModelRequired & ({
  type: 'deposit.crypto',
  txnHash: string,
} | {
  type: 'deposit.twBank',
  uuid: string,
} | {
  type: 'nftBuy',
  nftTxnId: ObjectId,
} | {
  type: 'nftSell',
  nftTxnId: ObjectId,
});

export type UserBalanceHistoryTxnType = UserBalanceHistoryModel['type'];
