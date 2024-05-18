import {nftBlackHoleAccountId} from '@spinach/common/const/nft';
import {recordUserDataAfterNftTxn} from '@spinach/common/controller/actors/user';
import {
  nftExchangeMatchedCollection,
  nftTxnCollection,
} from '@spinach/common/controller/collections/nft';
import {Mongo} from '@spinach/common/controller/const';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {NftTxnModel} from '@spinach/common/types/data/nft';
import {ObjectId} from 'mongodb';

import {getNftInfo} from '@spinach/next/controller/nft/info';


type SellNftOpts = {
  seller: ObjectId,
  matchRequestUuid: string,
};

export const sellNft = async ({seller, matchRequestUuid}: SellNftOpts): Promise<ApiErrorCode | null> => {
  const matchRequest = await nftExchangeMatchedCollection.findOne({requestUuid: matchRequestUuid});
  if (!matchRequest) {
    return 'nftMatchRequestNotFound';
  }

  const nftInfo = await getNftInfo(matchRequest.nftId);
  if (!nftInfo) {
    return 'nftInfoNotFound';
  }

  const {amount} = matchRequest;
  const txn: NftTxnModel = {
    nftId: nftInfo._id,
    from: seller,
    to: new ObjectId(nftBlackHoleAccountId),
    price: amount.requested,
  };

  await Mongo.withSession(async (session) => {
    await session.withTransaction(async () => {
      const nftTxn = await nftTxnCollection.insertOne(txn, {session});

      await recordUserDataAfterNftTxn({
        nftTxnId: nftTxn.insertedId,
        nftTxn: txn,
        session,
      });
    });
  });

  return null;
};
