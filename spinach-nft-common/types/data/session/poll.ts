import {ObjectId} from 'mongodb';


export type SessionPollRecordModel = {
  userId: ObjectId,
  lastCheck: Date,
};
