import {Mongo} from '@spinach/common/controller/const';
import {GoldCompletedExchange, GoldPendingExchange} from '@spinach/common/types/data/gold';


const userDb = Mongo.db('gold');

export const goldPendingCollection = userDb.collection<GoldPendingExchange>('pending');

export const goldCompletedCollection = userDb.collection<GoldCompletedExchange>('completed');

const initGoldDatabaseIndex = () => {
  return Promise.all([
    goldPendingCollection.createIndex({wallet: 1}, {unique: true}),
    goldPendingCollection.createIndex({expiry: 1}, {expireAfterSeconds: 0}),
    goldCompletedCollection.createIndex({wallet: 1}),
    goldCompletedCollection.createIndex({hash: 1}, {unique: true}),
  ]);
};

initGoldDatabaseIndex().catch((err) => console.error('Failed to init GOLD db index', err));
