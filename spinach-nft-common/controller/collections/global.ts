import {Mongo} from '@spinach/common/controller/const';
import {GlobalConfig} from '@spinach/common/types/data/global';


const db = Mongo.db('global');

export const globalConfigCollection = db.collection<GlobalConfig>('config');
