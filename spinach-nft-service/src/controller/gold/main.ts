import {userInfoCollection} from '@spinach/common/controller/auth';
import {txnCompletedCollection, txnTrackedCollection, txnWalletCollection} from '@spinach/common/controller/gold';
import {GoldCompletedTxn, GoldTrackedTxn} from '@spinach/common/types/data/gold';
import {isNotNullish} from '@spinach/common/utils/type';
import {MongoError, SortDirection} from 'mongodb';

import {TrxWalletTransferResponseData} from '@spinach/service/type/tron/transfer';


export const getOwnedWallets = async () => {
  return txnWalletCollection.find().map(({wallet}) => wallet).toArray();
};

export const recordTxnTracked = async (txn: TrxWalletTransferResponseData[]) => {
  const trackedTxn = txn.map((txn) => ({
    amount: parseFloat(txn.amount),
    decimals: txn.decimals,
    hash: txn.hash,
    from: txn.from,
    to: txn.to,
    blockEpoch: txn.block_timestamp,
  } satisfies GoldTrackedTxn));

  if (!trackedTxn.length) {
    console.warn('No tracked TxN to record');
    return [];
  }

  try {
    await txnTrackedCollection.insertMany(trackedTxn, {ordered: false});
  } catch (e) {
    if (!(e instanceof MongoError) || e.code !== 11000) {
      throw e;
    }

    // Duplicated key error - ignore, because we got documents inserted already because of `{ordered: false}`
  }

  return trackedTxn;
};

const makeTrackedTxnCompleted = async (trackedTxn: GoldTrackedTxn): Promise<GoldCompletedTxn | null> => {
  const account = await userInfoCollection.findOne({wallet: trackedTxn.from});

  if (!account) {
    return null;
  }

  console.log(`Found completed TxN for account [${account.username}] - ${trackedTxn.hash}`);
  return {
    ...trackedTxn,
    accountId: account._id,
  };
};

export const recordTxnCompleted = async (trackedTxn: GoldTrackedTxn[]) => {
  const completedTxn = (await Promise.all(trackedTxn.map(makeTrackedTxnCompleted)))
    .filter(isNotNullish);

  if (!completedTxn.length) {
    return;
  }

  await txnCompletedCollection.insertMany(completedTxn);
};

export const getLastTrackedTxnEpoch = async () => {
  const last = await txnTrackedCollection.findOne(
    {},
    {sort: {blockEpoch: 'desc'} satisfies {[key in keyof GoldTrackedTxn]?: SortDirection}},
  );

  return last?.blockEpoch;
};
