import {fxMarket} from '@spinach/common/const/fx';
import {txnCompletedCollection, txnTrackedCollection} from '@spinach/common/controller/collections/gold';
import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {getFxRate} from '@spinach/common/controller/common/fx';
import {GoldCompletedTxn, GoldTrackedTxn} from '@spinach/common/types/data/gold';
import {isNotNullish} from '@spinach/common/utils/type';
import {AnyBulkWriteOperation, MongoBulkWriteError, SortDirection} from 'mongodb';

import {TrxWalletTransferResponseData} from '@spinach/service/type/tron/transfer';


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

const makeTrackedTxnCompleted = (
  fx: string,
) => async (
  trackedTxn: GoldTrackedTxn,
): Promise<GoldCompletedTxn | null> => {
  const account = await userInfoCollection.findOne({wallet: trackedTxn.from});

  if (!account) {
    return null;
  }

  console.log(`Found completed TxN for account [${account.username}] - ${trackedTxn.hash}`);
  return {
    ...trackedTxn,
    fx,
    goldEquivalent: trackedTxn.amount * parseFloat(fx) / (10 ** trackedTxn.decimals),
    accountId: account._id,
  };
};

export const recordTxnCompleted = async (trackedTxn: GoldTrackedTxn[]): Promise<GoldCompletedTxn[]> => {
  const fx = await getFxRate(fxMarket);

  if (!fx) {
    console.warn('Not recording TxN - FX rate unavailable');
    return [];
  }

  const completedTxn = (await Promise.all(trackedTxn.map(makeTrackedTxnCompleted(fx))))
    .filter(isNotNullish);

  if (!completedTxn.length) {
    return [];
  }

  try {
    await txnCompletedCollection.insertMany(completedTxn, {ordered: false});
  } catch (e) {
    if (!(e instanceof MongoBulkWriteError)) {
      throw e;
    }
  }

  return completedTxn;
};

export const getLastTrackedTxnEpoch = async (wallet: string) => {
  const last = await txnTrackedCollection.findOne(
    {to: wallet},
    {sort: {blockEpoch: 'desc'} satisfies {[key in keyof GoldTrackedTxn]?: SortDirection}},
  );

  return last?.blockEpoch;
};
