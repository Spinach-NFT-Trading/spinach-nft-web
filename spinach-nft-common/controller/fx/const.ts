import {Mongo} from '@spinach/common/controller/const';
import {CurrentFx} from '@spinach/common/types/data/fx';


const userDb = Mongo.db('fx');

export const currentFxCollection = userDb.collection<CurrentFx>('current');

const initCurrentFxIndex = () => {
  return currentFxCollection.createIndex({market: 1}, {unique: true});
};

initCurrentFxIndex().catch((err) => console.error('Failed to init current FX index', err));
