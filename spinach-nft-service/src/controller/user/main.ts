import {getGlobalConfig} from '@spinach/common/controller/actors/global';
import {getNewBalance} from '@spinach/common/controller/actors/user';
import {userBalanceCollection} from '@spinach/common/controller/collections/user';
import {GlobalConfig} from '@spinach/common/types/data/global';
import {GoldCompletedTxn} from '@spinach/common/types/data/gold/txn';


type RecordBalanceAfterCryptoDepositSingleOpts = {
  config: GlobalConfig,
  txn: GoldCompletedTxn,
};

export const recordBalanceAfterCryptoDepositSingle = async ({
  config,
  txn,
}: RecordBalanceAfterCryptoDepositSingleOpts) => {
  const {accountId, hash, goldEquivalent} = txn;

  const diff = goldEquivalent;

  // Need to call `insertOne()` twice because `getNewBalance()` fetches the latest balance
  await userBalanceCollection.insertOne({
    ...(await getNewBalance({
      accountId,
      diff,
    })),
    type: 'deposit.crypto',
    txnHash: hash,
  });
  await userBalanceCollection.insertOne({
    ...(await getNewBalance({
      accountId,
      diff: diff * (config.cashbackPercent.crypto / 100),
    })),
    type: 'deposit.crypto.cashback',
    txnHash: hash,
  });
};

export const recordBalanceAfterCryptoDeposit = async (txns: GoldCompletedTxn[]) => {
  const config = await getGlobalConfig();

  await Promise.all(txns.map((txn) => recordBalanceAfterCryptoDepositSingle({config, txn})));
};
