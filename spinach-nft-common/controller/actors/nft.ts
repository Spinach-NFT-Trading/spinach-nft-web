import {ClientSession} from 'mongodb';

import {defaultNftPriceTiers} from '@spinach/common/const/nft';
import {nftExchangeTokenCollection, nftPriceTierCollection} from '@spinach/common/controller/collections/nft';
import {userNftPositionCollection} from '@spinach/common/controller/collections/user';
import {getDataAsMap} from '@spinach/common/controller/utils/common';
import {NftPriceTierModel, NftTxnModel} from '@spinach/common/types/data/nft';


export const getNftPriceTiers = async (): Promise<NftPriceTierModel[]> => {
  const tiers = await nftPriceTierCollection.find().toArray();

  // Price tiers not set up, insert default ones
  if (!tiers.length) {
    await nftPriceTierCollection.insertMany(defaultNftPriceTiers);
    return defaultNftPriceTiers;
  }

  return tiers;
};

type UpsertNftPositionOpts = {
  nftTxn: NftTxnModel,
  session: ClientSession;
};

export const upsertNftPosition = ({nftTxn, session}: UpsertNftPositionOpts) => {
  return userNftPositionCollection.updateOne(
    {nftId: nftTxn.nftId},
    {$set: {owner: nftTxn.to, price: nftTxn.price}},
    {upsert: true, session},
  );
};


type GetNftExchangeTokenMapByIdsOpts = {
  tokenIds: string[],
};

export const getNftExchangeTokenMapByIds = ({
  tokenIds,
}: GetNftExchangeTokenMapByIdsOpts) => {
  return getDataAsMap(
    nftExchangeTokenCollection,
    ({token}) => token,
    {token: {$in: tokenIds}},
  );
};
