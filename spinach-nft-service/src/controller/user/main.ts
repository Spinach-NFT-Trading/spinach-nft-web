import {userBalanceCollection} from '@spinach/common/controller/collections/user';
import {getCurrentBalance} from '@spinach/common/controller/common/user';
import {GoldCompletedTxn} from '@spinach/common/types/data/gold';
import {NftTxnModel} from '@spinach/common/types/data/nft';
import {UserBalanceHistoryModel, UserBalanceHistoryModelRequired} from '@spinach/common/types/data/user';
import {ClientSession, ObjectId} from 'mongodb';


type GetNewAccountBalance = {
  accountId: ObjectId,
  diff: number,
};

const getNewAccountBalance = async ({
  accountId,
  diff,
}: GetNewAccountBalance): Promise<UserBalanceHistoryModelRequired> => {
  const prev = await getCurrentBalance(accountId);

  return {
    userId: accountId,
    diff,
    current: (prev?.current ?? 0) + diff,
  };
};

export const recordBalanceAfterDeposit = async (txns: GoldCompletedTxn[]) => {
  const newRecords: UserBalanceHistoryModel[] = [];

  for (const {accountId, amount, decimals, hash} of txns) {
    const diff = amount / decimals;

    newRecords.push({
      ...(await getNewAccountBalance({accountId, diff})),
      type: 'deposit',
      txnHash: hash,
    });
  }

  if (newRecords.length) {
    await userBalanceCollection.insertMany(newRecords, {ordered: false});
  }
};

type RecordBalanceAfterNftTxnOpts = {
  nftTxnId: ObjectId,
  nftTxn: NftTxnModel,
  session?: ClientSession,
};

export const recordBalanceAfterNftTxn = async ({nftTxnId, nftTxn, session}: RecordBalanceAfterNftTxnOpts) => {
  await userBalanceCollection.insertMany([
    {
      ...(await getNewAccountBalance({
        accountId: nftTxn.from,
        diff: nftTxn.price,
      })),
      type: 'nftSell',
      nftTxnId,
    },
    {
      ...(await getNewAccountBalance({
        accountId: nftTxn.to,
        diff: -nftTxn.price,
      })),
      type: 'nftBuy',
      nftTxnId,
    },
  ], {session});
};
