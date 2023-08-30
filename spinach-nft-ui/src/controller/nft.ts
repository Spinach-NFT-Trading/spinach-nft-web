'use server';
import {getGoldAsset, recordUserDataAfterNftTxn} from '@spinach/common/controller/actors/user';
import {nftInfoCollection, nftOnSaleCollection, nftTxnCollection} from '@spinach/common/controller/collections/nft';
import {userNftPositionCollection} from '@spinach/common/controller/collections/user';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {NftTxnModel} from '@spinach/common/types/data/nft';
import {ObjectId} from 'mongodb';

import mongoPromise from '@spinach/next/lib/mongodb';
import {NftInfoMap, NftPriceMap} from '@spinach/next/types/mongo/nft';
import {toSum} from '@spinach/next/utils/array';


export const getNftOnSale = (nftId: ObjectId) => {
  return nftOnSaleCollection.findOne({id: nftId});
};

export const getNftOnSaleList = (limit: number) => {
  return nftOnSaleCollection.find({}, {limit, projection: {_id: false}});
};

export const getNftInfo = (nftId: ObjectId) => {
  return nftInfoCollection.findOne({_id: nftId});
};

export const getNftInfoMultiple = (nftIds: ObjectId[]) => {
  return nftInfoCollection.find({_id: {$in: nftIds}});
};

export const getNftLastTradedPriceMap = async (nftIds: ObjectId[]): Promise<NftPriceMap> => {
  const nftPriceMap: NftPriceMap = {};

  for await (const {nftId, price} of nftTxnCollection.find({nftId: {$in: nftIds}}, {sort: {_id: 'desc'}})) {
    const nftIdString = nftId.toString();

    if (nftIdString in nftPriceMap) {
      continue;
    }

    nftPriceMap[nftIdString] = price;
  }

  return nftPriceMap;
};

export const getNftAsset = async (accountId: ObjectId): Promise<number> => {
  const nftInfo = await (await getNftPositionInfo(accountId)).toArray();
  const nftPriceMap = await getNftLastTradedPriceMap(nftInfo.map(({_id}) => _id));

  return toSum(nftInfo.map(({_id}) => nftPriceMap[_id.toString()]));
};

export const getNftInfoMap = async (nftIds: ObjectId[]): Promise<NftInfoMap> => {
  const ret: NftInfoMap = {};

  for await (const nftInfo of getNftInfoMultiple(nftIds)) {
    ret[nftInfo._id.toString()] = nftInfo;
  }

  return ret;
};

export const getNftPositionInfo = async (owner: ObjectId) => {
  const positionNftIds = await userNftPositionCollection.find({owner}).map(({nftId}) => nftId).toArray();

  return getNftInfoMultiple(positionNftIds);
};

type NftBuyOpts = {
  buyer: ObjectId,
  nftId: ObjectId,
};

export const buyNft = async ({buyer, nftId}: NftBuyOpts): Promise<ApiErrorCode | null> => {
  const [balance, nftOnSale] = await Promise.all([
    getGoldAsset(buyer),
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
      const nftTxn = await nftTxnCollection.insertOne(txn, {session});

      await recordUserDataAfterNftTxn({
        nftTxnId: nftTxn.insertedId,
        nftTxn: txn,
        session,
      });

      // Mark NFT sold
      await nftOnSaleCollection.deleteOne({id: nftOnSale.id});
    });
  });

  return null;
};
