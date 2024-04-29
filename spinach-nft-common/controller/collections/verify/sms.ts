import {Mongo} from '@spinach/common/controller/const';
import {SmsVerifyFinalizedData, SmsVerifyInitialData} from '@spinach/common/types/data/verify/sms';


const db = Mongo.db('user');

export const smsVerifyInitialCollection = db.collection<SmsVerifyInitialData>('verify/sms/initial');

export const smsVerifyFinalizedCollection = db.collection<SmsVerifyFinalizedData>('verify/sms/finalized');

const initDbIndex = () => {
  return Promise.all([
    smsVerifyInitialCollection.createIndex({key: 1, otp: 1}, {unique: true}),
    smsVerifyInitialCollection.createIndex({phone: 1}, {unique: true}),
    smsVerifyInitialCollection.createIndex({expiry: 1}, {expireAfterSeconds: 0}),
    smsVerifyFinalizedCollection.createIndex({key: 1, otp: 1}, {unique: true}),
    smsVerifyFinalizedCollection.createIndex({phone: 1}, {unique: true}),
    smsVerifyFinalizedCollection.createIndex({expiry: 1}, {expireAfterSeconds: 0}),
  ]);
};

initDbIndex().catch((err) => console.error('Failed to init SMS verify indexes', err));
