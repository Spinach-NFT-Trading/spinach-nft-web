import {ApiErrorCode} from '@spinach/common/types/api/error';
import {Collection, ObjectId} from 'mongodb';

import {removeSmsVerificationPending} from '@spinach/next/controller/account/verify/sms/pending';
import mongoPromise from '@spinach/next/lib/mongodb';
import {AccountVerifySmsCompletedData} from '@spinach/next/types/mongo/account/verify';


const getCollection = async (): Promise<Collection<AccountVerifySmsCompletedData>> => {
  const client = await mongoPromise;

  return client
    .db('user')
    .collection<AccountVerifySmsCompletedData>('verify.sms.completed');
};

type RecordSmsVerificationCompleteOpts = {
  userId: ObjectId,
  code: string,
};

export const recordSmsVerificationComplete = async ({
  userId,
  code,
}: RecordSmsVerificationCompleteOpts): Promise<ApiErrorCode | null> => {
  const isCodeVerified = await removeSmsVerificationPending({userId, code});

  if (!isCodeVerified) {
    return 'smsCodeInvalid';
  }

  await (await getCollection()).insertOne(
    {
      userId,
      completedAt: new Date(),
    },
  );

  return null;
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({userId: 1}, {unique: true}),
  ]);
};

addIndex()
  .catch((e) => console.error('MongoDB failed to add SMS verification completed data index', e));
