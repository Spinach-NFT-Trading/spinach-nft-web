import {Collection, ObjectId} from 'mongodb';

import {smsVerificationExpiry} from '@spinach/next/const/sms';
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
  phone: string,
};

export const recordSmsVerificationPending = async ({
  userId,
  phone,
}: RecordSmsVerificationPendingOpts): Promise<string | null> => {
  const collection = await getCollection();

  if (await collection.findOne({userId})) {
    return null;
  }

  const code = generateOtp(6);
  await collection.insertOne({
    userId,
    phone,
    code,
    expiry: new Date(new Date().getTime() + smsVerificationExpiry * 1000),
  });

  return code;
};

type RemoveSmsVerificationPendingOpts = {
  userId: ObjectId,
  code: AccountVerifySmsCode,
};

export const getAndRemovePendingSmsVerification = async ({
  userId,
  code,
}: RemoveSmsVerificationPendingOpts): Promise<AccountVerifySmsPendingData | null> => {
  const data = await (await getCollection()).findOneAndDelete({
    userId,
    code,
  });

  return data.value;
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
