import {getGoldAsset, recordUserDataAfterNftTxn} from '@spinach/common/controller/actors/user';
import {nftOnSaleCollection, nftTxnCollection} from '@spinach/common/controller/collections/nft';
import {userNftPositionCollection} from '@spinach/common/controller/collections/user';
import {Mongo} from '@spinach/common/controller/const';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {NftTxnModel} from '@spinach/common/types/data/nft';
import {toSum} from '@spinach/common/utils/array';
import {ObjectId} from 'mongodb';

import {getNftInfoMap, getNftInfoMultiple} from '@spinach/next/controller/nft/info';
import {getNftOnSale, getNftOnSaleList} from '@spinach/next/controller/nft/onSale';
import {NftPriceMap} from '@spinach/next/types/mongo/nft';
import {NftListingData} from '@spinach/next/types/nft';


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

  await Mongo.withSession(async (session) => {
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

export const getNftListing = async (limit: number): Promise<NftListingData[]> => {
  const nftOnSale = await getNftOnSaleList(limit).toArray();
  const nftInfoMap = await getNftInfoMap(nftOnSale.map(({id}) => id));

  return nftOnSale.map(({id, price}) => {
    const idString = id.toString();

    return {
      id: idString,
      price,
      ...nftInfoMap[idString],
    } satisfies NftListingData;
  });
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

export const getNftPositionInfo = async (owner: ObjectId) => {
  const positionNftIds = await userNftPositionCollection.find({owner}).map(({nftId}) => nftId).toArray();

  return getNftInfoMultiple(positionNftIds);
};

export const getNftAsset = async (accountId: ObjectId): Promise<number> => {
  const nftInfo = await (await getNftPositionInfo(accountId)).toArray();
  const nftPriceMap = await getNftLastTradedPriceMap(nftInfo.map(({_id}) => _id));

  return toSum(nftInfo.map(({_id}) => nftPriceMap[_id.toString()]));
};
