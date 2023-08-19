import console from 'console';

import {Mongo} from '@spinach/common/controller/const';
import {NftInfoModel, NftOnSaleModel, NftTxnModel} from '@spinach/common/types/data/nft';


const db = Mongo.db('nft');

export const nftInfoCollection = db.collection<NftInfoModel>('info');

export const nftOnSaleCollection = db.collection<NftOnSaleModel>('onSale');

export const nftTxnCollection = db.collection<NftTxnModel>('txn');

const initTxnDatabaseIndex = () => {
  return Promise.all([
    nftTxnCollection.createIndex({from: 1}),
    nftTxnCollection.createIndex({to: 1}),
  ]);
};

initTxnDatabaseIndex().catch((err) => console.error('Failed to init NFT db index', err));
