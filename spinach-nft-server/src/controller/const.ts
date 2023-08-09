import {MongoClient} from 'mongodb';

import {MongoUri} from '@/env';


export const Mongo = new MongoClient(MongoUri, {});
