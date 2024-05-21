import {ObjectId} from 'mongodb';


export type UserBalanceHistoryModelRequired = {
  userId: ObjectId,
  diff: number,
  current: number,
};

export type UserBalanceHistoryModel = UserBalanceHistoryModelRequired & ({
  type: 'deposit.crypto' | 'deposit.crypto.cashback',
  txnHash: string,
} | {
  type: 'deposit.twBank' | 'deposit.twBank.cashback',
  uuid: string,
} | {
  type: 'nftBuy',
  nftTxnId: ObjectId,
} | {
  type: 'nftSell' | 'nftSellRefund',
  nftTxnId: ObjectId,
});

export type UserBalanceHistoryTxnType = UserBalanceHistoryModel['type'];
