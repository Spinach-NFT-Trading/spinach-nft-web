import {nftTxnCollection} from '@spinach/common/controller/collections/nft';
import {userNftPositionCollection} from '@spinach/common/controller/collections/user';
import {toSum} from '@spinach/common/utils/array';
import {ObjectId} from 'mongodb';

import {getNftInfoMap, getNftInfoMultiple} from '@spinach/next/controller/nft/info';
import {getNftOnSaleList} from '@spinach/next/controller/nft/onSale';
import {NftPriceMap} from '@spinach/next/types/mongo/nft';
import {NftListingData} from '@spinach/next/types/nft';


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
