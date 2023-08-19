import {userInfoCollection} from '@spinach/common/controller/auth';
import {txnCompletedCollection, txnTrackedCollection, txnWalletCollection} from '@spinach/common/controller/gold';
import {GoldCompletedTxn, GoldTrackedTxn} from '@spinach/common/types/data/gold';
import {isNotNullish} from '@spinach/common/utils/type';
import {AnyBulkWriteOperation, MongoBulkWriteError, SortDirection} from 'mongodb';

import {TrxWalletTransferResponseData} from '@spinach/service/type/tron/transfer';


export const getOwnedWallets = async () => {
  return txnWalletCollection.find().map(({wallet}) => wallet).toArray();
};

type RecordTxnTrackedResult = {
  trackedTxn: GoldTrackedTxn[],
  newTxnCount: number,
};

export const recordTxnTracked = async (txn: TrxWalletTransferResponseData[]): Promise<RecordTxnTrackedResult> => {
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
    return {trackedTxn: [], newTxnCount: 0};
  }

  try {
    const result = await txnTrackedCollection.bulkWrite(
      trackedTxn.map((txn) => ({insertOne: {document: txn}} satisfies AnyBulkWriteOperation<GoldTrackedTxn>)),
      {ordered: false},
    );

    return {trackedTxn, newTxnCount: result.insertedCount};
  } catch (e) {
    if (!(e instanceof MongoBulkWriteError)) {
      throw e;
    }

    return {trackedTxn, newTxnCount: e.result.insertedCount};
  }
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

  try {
    await txnCompletedCollection.insertMany(completedTxn, {ordered: false});
  } catch (e) {
    if (!(e instanceof MongoBulkWriteError)) {
      throw e;
    }
  }
};

export const getLastTrackedTxnEpoch = async (wallet: string) => {
  const last = await txnTrackedCollection.findOne(
    {to: wallet},
    {sort: {blockEpoch: 'desc'} satisfies {[key in keyof GoldTrackedTxn]?: SortDirection}},
  );

  return last?.blockEpoch;
};
