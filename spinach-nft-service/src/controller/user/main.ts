import {userBalanceCollection} from '@spinach/common/controller/collections/user';
import {getCurrentBalance} from '@spinach/common/controller/common/user';
import {GoldCompletedTxn} from '@spinach/common/types/data/gold';
import {UserBalanceHistoryModel} from '@spinach/common/types/data/user';


export const recordBalanceDeposit = async (txns: GoldCompletedTxn[]) => {
  const newRecords: UserBalanceHistoryModel[] = [];

  for (const {accountId, amount, decimals, hash} of txns) {
    const diff = amount / decimals;

    const prev = await getCurrentBalance(accountId);

    newRecords.push({
      userId: accountId,
      diff,
      current: (prev?.current ?? 0) + diff,
      type: 'deposit',
      txnHash: hash,
    });
  }

  if (newRecords.length) {
    await userBalanceCollection.insertMany(newRecords, {ordered: false});
  }
};
