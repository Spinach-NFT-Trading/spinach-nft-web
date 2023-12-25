import {ObjectId} from 'mongodb';

import {VerificationStatus} from '@spinach/common/types/common/status';


export type GoldPurchaseTwBankRecord = {
  accountId: ObjectId,
  sourceBankDetailsUuid: string,
  targetWalletId: ObjectId,
  uuid: string,
  amount: number,
  status: VerificationStatus,
};

export type GoldPurchaseTwBankRecordClient = Omit<GoldPurchaseTwBankRecord, 'accountId' | 'targetWalletId'> & {
  accountId: string,
  targetWalletId: string,
};
