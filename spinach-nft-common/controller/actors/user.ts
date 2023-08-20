import {ClientSession, ObjectId} from 'mongodb';

import {userBalanceCollection} from '@spinach/common/controller/collections/user';
import {NftTxnModel} from '@spinach/common/types/data/nft';
import {UserBalanceHistoryModelRequired} from '@spinach/common/types/data/user';


type GetNewAccountBalance = {
  accountId: ObjectId,
  diff: number,
};

export const getNewBalance = async ({
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

export const getCurrentBalance = (userId: ObjectId) => userBalanceCollection.findOne({userId}, {sort: {_id: -1}});

type RecordBalanceAfterNftTxnOpts = {
  nftTxnId: ObjectId,
  nftTxn: NftTxnModel,
  session?: ClientSession,
};

export const recordBalanceAfterNftTxn = async ({nftTxnId, nftTxn, session}: RecordBalanceAfterNftTxnOpts) => {
  await userBalanceCollection.insertMany([
    {
      ...(await getNewBalance({
        accountId: nftTxn.from,
        diff: nftTxn.price,
      })),
      type: 'nftSell',
      nftTxnId,
    },
    {
      ...(await getNewBalance({
        accountId: nftTxn.to,
        diff: -nftTxn.price,
      })),
      type: 'nftBuy',
      nftTxnId,
    },
  ], {session});
};
