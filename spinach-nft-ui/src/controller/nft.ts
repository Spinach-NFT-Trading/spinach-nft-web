'use server';
import {nftInfoCollection, nftOnSaleCollection, nftTxnCollection} from '@spinach/common/controller/collections/nft';
import {getCurrentBalance} from '@spinach/common/controller/common/user';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {NftTxnModel} from '@spinach/common/types/data/nft';
import {ObjectId} from 'mongodb';
import {recordBalanceAfterNftTxn} from 'spinach-nft-service/src/controller/user/main';

import mongoPromise from '@spinach/next/lib/mongodb';
import {NftInfoMap} from '@spinach/next/types/mongo/nft';


export const getNftOnSale = (nftId: ObjectId) => {
  return nftOnSaleCollection.findOne({id: nftId});
};

export const getNftOnSaleList = (limit: number) => {
  return nftOnSaleCollection.find({}, {limit, projection: {_id: false}});
};

export const getNftInfo = (nftId: ObjectId) => {
  return nftInfoCollection.findOne({_id: nftId});
};

export const getNftInfoMap = async (nftIds: ObjectId[]): Promise<NftInfoMap> => {
  const ret: NftInfoMap = {};

  for await (const nftInfo of nftInfoCollection.find({_id: {$in: nftIds}})) {
    ret[nftInfo._id.toString()] = nftInfo;
  }

  return ret;
};

type NftBuyOpts = {
  buyer: ObjectId,
  nftId: ObjectId,
};

export const buyNft = async ({buyer, nftId}: NftBuyOpts): Promise<ApiErrorCode | null> => {
  const [balance, nftOnSale] = await Promise.all([
    getCurrentBalance(buyer),
    getNftOnSale(nftId),
  ]);

  if (!nftOnSale) {
    return 'nftNotOnSale';
  }

  if (!balance || balance.current <= nftOnSale.price) {
    return 'goldNotEnough';
  }

  const txn: NftTxnModel = {
    nftId: nftOnSale.id,
    from: nftOnSale.seller,
    to: buyer,
    price: nftOnSale.price,
  };

  await (await mongoPromise).withSession(async (session) => {
    await session.withTransaction(async () => {
      await Promise.all([
        nftTxnCollection.insertOne(txn, {session}),
        recordBalanceAfterNftTxn(txn, session),
      ]);
    });
  });

  return null;
};
