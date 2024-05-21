import {ClientSession, ObjectId} from 'mongodb';

import {userBalanceCollection, userNftPositionCollection} from '@spinach/common/controller/collections/user';
import {NftTxnModel} from '@spinach/common/types/data/nft';
import {UserBalanceHistoryModelRequired} from '@spinach/common/types/data/user/balance';


type GetNewBalanceOpts = {
  accountId: ObjectId,
  diff: number,
  session?: ClientSession,
};

export const getNewBalance = async ({
  accountId,
  diff,
  session,
}: GetNewBalanceOpts): Promise<UserBalanceHistoryModelRequired> => {
  const prev = await getGoldAsset({userId: accountId, session});

  return {
    userId: accountId,
    diff,
    current: (prev?.current ?? 0) + diff,
  };
};

type GetGoldAssetOpts = {
  userId: ObjectId,
  session?: ClientSession,
};

export const getGoldAsset = ({
  userId,
  session,
}: GetGoldAssetOpts) => (
  userBalanceCollection.findOne({userId}, {sort: {_id: -1}, session})
);

type RecordBalanceAfterNftTxnOpts = {
  nftTxnId: ObjectId,
  nftTxn: NftTxnModel,
  session: ClientSession,
};

export const recordUserDataAfterNftTxn = async ({nftTxnId, nftTxn, session}: RecordBalanceAfterNftTxnOpts) => {
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
  await userNftPositionCollection.updateOne(
    {nftId: nftTxn.nftId},
    {$set: {owner: nftTxn.to, price: nftTxn.price}},
    {upsert: true, session},
  );
};
