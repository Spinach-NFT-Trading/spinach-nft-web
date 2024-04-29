import {sessionPollCollection} from '@spinach/common/controller/collections/session';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';


type RecordSessionPollOpts = ControllerRequireUserIdOpts;

export const recordSessionPoll = async ({executorUserId}: RecordSessionPollOpts) => {
  await sessionPollCollection.updateOne(
    {userId: new ObjectId(executorUserId)},
    {$set: {lastCheck: new Date()}},
    {upsert: true},
  );
};
