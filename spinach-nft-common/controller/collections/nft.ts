import console from 'console';

import {Mongo} from '@spinach/common/controller/const';
import {
  NftImageModel,
  NftInfoModel,
  NftOnSaleModel,
  NftPriceTierModel,
  NftTxnModel,
} from '@spinach/common/types/data/nft';
import {NftLimitedPendingModel} from '@spinach/common/types/data/nft/limited';
import {NftExchangeMatchedModel} from '@spinach/common/types/data/nft/match';
import {NftExchangeQueuedModel} from '@spinach/common/types/data/nft/queue';
import {NftExchangeTokenModel} from '@spinach/common/types/data/nft/token';


const db = Mongo.db('nft');

export const nftInfoCollection = db.collection<NftInfoModel>('info');

export const nftOnSaleCollection = db.collection<NftOnSaleModel>('onSale');

export const nftLimitedPendingCollection = db.collection<NftLimitedPendingModel>('limited/pending');

export const nftPriceTierCollection = db.collection<NftPriceTierModel>('tier');

export const nftTxnCollection = db.collection<NftTxnModel>('txn');

export const nftImageCollection = db.collection<NftImageModel>('images');

export const nftExchangeTokenCollection = db.collection<NftExchangeTokenModel>(
  'exchange/token',
);

export const nftExchangeQueueCollection = db.collection<NftExchangeQueuedModel>(
  'exchange/queue',
);

export const nftExchangeMatchedCollection = db.collection<NftExchangeMatchedModel>(
  'exchange/match',
);

const initDbIndex = () => {
  return Promise.all([
    nftTxnCollection.createIndex({from: 1}),
    nftTxnCollection.createIndex({to: 1}),
    nftImageCollection.createIndex({url: 1}, {unique: true}),
    nftPriceTierCollection.createIndex({price: 1}, {unique: true}),
    nftLimitedPendingCollection.createIndex({nftId: 1}, {unique: true}),
    nftLimitedPendingCollection.createIndex({buyer: 1}),
    nftExchangeTokenCollection.createIndex({accountId: 1}),
    nftExchangeTokenCollection.createIndex({token: 1}, {unique: true}),
    nftExchangeQueueCollection.createIndex({requestUuid: 1}, {unique: true}),
    nftExchangeMatchedCollection.createIndex({completedAt: 1}),
  ]);
};

initDbIndex().catch((err) => console.error('Failed to init NFT db index', err));
