import {Mongo} from '@spinach/common/controller/const';
import {SessionPollRecordModel} from '@spinach/common/types/data/session/poll';


const db = Mongo.db('session');

export const sessionPollCollection = db.collection<SessionPollRecordModel>('poll');

const initDbIndex = async () => {
  return Promise.all([
    sessionPollCollection.createIndex({userId: 1}),
    sessionPollCollection.createIndex({lastCheck: 1}, {expireAfterSeconds: 86400}),
  ]);
};

initDbIndex().catch((err) => console.error('Failed to init session db index', err));
