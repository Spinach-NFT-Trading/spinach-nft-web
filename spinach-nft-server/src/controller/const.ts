import {MongoClient} from 'mongodb';

import {MongoUri} from '@spinach/server/env';


export const Mongo = new MongoClient(MongoUri, {});
