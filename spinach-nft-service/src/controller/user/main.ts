import {getNewBalance} from '@spinach/common/controller/actors/user';
import {userBalanceCollection} from '@spinach/common/controller/collections/user';
import {GoldCompletedTxn} from '@spinach/common/types/data/gold/txn';
import {UserBalanceHistoryModel} from '@spinach/common/types/data/user/balance';


export const recordBalanceAfterDeposit = async (txns: GoldCompletedTxn[]) => {
  const newRecords: UserBalanceHistoryModel[] = [];

  for (const {accountId, hash, goldEquivalent} of txns) {
    const diff = goldEquivalent;

    newRecords.push({
      ...(await getNewBalance({accountId, diff})),
      type: 'deposit',
      txnHash: hash,
    });
  }

  if (newRecords.length) {
    await userBalanceCollection.insertMany(newRecords, {ordered: false});
  }
};
