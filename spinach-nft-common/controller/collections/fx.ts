import {Mongo} from '@spinach/common/controller/const';
import {CurrentFx} from '@spinach/common/types/data/fx';


const db = Mongo.db('fx');

export const currentFxCollection = db.collection<CurrentFx>('current');

const initDbIndex = () => {
  return currentFxCollection.createIndex({market: 1}, {unique: true});
};

initDbIndex().catch((err) => console.error('Failed to init current FX index', err));
