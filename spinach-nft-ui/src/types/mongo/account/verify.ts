import {ObjectId} from 'mongodb';


export type AccountVerifySmsCode = string;

export type AccountVerifySmsCommonData = {
  userId: ObjectId,
};

export type AccountVerifySmsPendingData = AccountVerifySmsCommonData & {
  code: AccountVerifySmsCode,
  expiry: Date,
};

export type AccountVerifySmsCompletedData = AccountVerifySmsCommonData & {
  completedAt: Date,
};
