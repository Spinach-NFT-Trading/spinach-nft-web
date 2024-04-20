import {getGlobalConfig} from '@spinach/common/controller/actors/global';
import {getNewBalance} from '@spinach/common/controller/actors/user';
import {userBalanceCollection} from '@spinach/common/controller/collections/user';
import {GoldCompletedTxn} from '@spinach/common/types/data/gold/txn';
import {UserBalanceHistoryModel} from '@spinach/common/types/data/user/balance';


export const recordBalanceAfterCryptoDeposit = async (txns: GoldCompletedTxn[]) => {
  const newRecords: UserBalanceHistoryModel[] = [];

  const config = await getGlobalConfig();

  for (const {accountId, hash, goldEquivalent} of txns) {
    const diff = goldEquivalent;

    newRecords.push({
      ...(await getNewBalance({
        accountId,
        diff,
        multiplier: config.cashbackPercent.crypto / 100,
      })),
      type: 'deposit.crypto',
      txnHash: hash,
    });
  }

  if (newRecords.length) {
    await userBalanceCollection.insertMany(newRecords, {ordered: false});
  }
};
