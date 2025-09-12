import {ClientSession, ObjectId} from 'mongodb';

import {userBalanceCollection, userNftPositionCollection} from '@spinach/common/controller/collections/user';
import {getUserInfoById} from '@spinach/common/controller/user/info';
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
  const [userOfFrom, userOfTo] = await Promise.all([
    getUserInfoById({requiresElevated: false, userId: nftTxn.from.toString()}),
    getUserInfoById({requiresElevated: false, userId: nftTxn.to.toString()}),
  ]);
  if (userOfFrom == null || userOfTo == null) {
    throw new Error('Unexpected null user when recording NFT TxN');
  }

  const [agentOfFrom, agentOfTo] = await Promise.all([
    getUserInfoById({requiresElevated: false, userId: userOfFrom?.recruitedBy ?? null}),
    getUserInfoById({requiresElevated: false, userId: userOfTo?.recruitedBy ?? null}),
  ]);

  const [balanceOfFrom, balanceOfTo] = await Promise.all([
    getNewBalance({accountId: nftTxn.from, diff: nftTxn.price, session}),
    getNewBalance({accountId: nftTxn.to, diff: -nftTxn.price, session}),
  ]);
  await userBalanceCollection.insertMany([
    {...balanceOfFrom, type: 'nftSell', nftTxnId},
    {...balanceOfTo, type: 'nftBuy', nftTxnId},
  ], {session});

  await userBalanceCollection.insertOne({
    ...await getNewBalance({
      accountId: nftTxn.from,
      diff: nftTxn.price * (userOfFrom.commissionPercentMember.sell / 100),
      session,
    }),
    type: 'nftSellCommissionMember',
    nftTxnId,
  });
  if (agentOfFrom) {
    await userBalanceCollection.insertOne({
      ...await getNewBalance({
        accountId: new ObjectId(agentOfFrom.id),
        diff: nftTxn.price * (agentOfFrom.commissionPercentAgent.sell / 100),
        session,
      }),
      type: 'nftSellCommissionAgent',
      nftTxnId,
    });
  }

  await userBalanceCollection.insertOne({
    ...await getNewBalance({
      accountId: nftTxn.to,
      diff: nftTxn.price * (userOfTo.commissionPercentMember.buy / 100),
      session,
    }),
    type: 'nftBuyCommissionMember',
    nftTxnId,
  });
  if (agentOfTo) {
    await userBalanceCollection.insertOne({
      ...await getNewBalance({
        accountId: new ObjectId(agentOfTo.id),
        diff: nftTxn.price * (agentOfTo.commissionPercentAgent.buy / 100),
        session,
      }),
      type: 'nftBuyCommissionAgent',
      nftTxnId,
    });
  }

  await userNftPositionCollection.updateOne(
    {nftId: nftTxn.nftId},
    {$set: {owner: nftTxn.to, price: nftTxn.price}},
    {upsert: true, session},
  );
};
