import {Collection, ObjectId} from 'mongodb';

import mongoPromise from '@spinach/next/lib/mongodb';
import {AccountVerifySmsCode, AccountVerifySmsPendingData} from '@spinach/next/types/mongo/account/verify';
import {generateOtp} from '@spinach/next/utils/otp';


const getCollection = async (): Promise<Collection<AccountVerifySmsPendingData>> => {
  const client = await mongoPromise;

  return client
    .db('user')
    .collection<AccountVerifySmsPendingData>('verify.sms.pending');
};

type RecordSmsVerificationPendingOpts = {
  userId: ObjectId,
};

export const recordSmsVerificationPending = async ({
  userId,
}: RecordSmsVerificationPendingOpts) => {
  const code = generateOtp(6);

  await (await getCollection()).insertOne({
    userId,
    code,
    expiry: new Date(new Date().getTime() + 86400),
  });

  return code;
};

type RemoveSmsVerificationPendingOpts = {
  userId: ObjectId,
  code: AccountVerifySmsCode,
};

export const removeSmsVerificationPending = async ({
  userId,
  code,
}: RemoveSmsVerificationPendingOpts): Promise<boolean> => {
  const {deletedCount} = await (await getCollection()).deleteOne({
    userId,
    code,
  });

  return deletedCount > 0;
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({userId: 1}, {unique: true}),
    collection.createIndex({userId: 1, expectedCode: 1}, {sparse: true}),
    collection.createIndex({expiry: 1}, {expireAfterSeconds: 0}),
  ]);
};

addIndex()
  .catch((e) => console.error('MongoDB failed to add SMS verification pending data index', e));
