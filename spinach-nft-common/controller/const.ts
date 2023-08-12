import {MongoClient} from 'mongodb';

import {MongoUri} from '@spinach/common/env';


export const Mongo = new MongoClient(MongoUri, {});
