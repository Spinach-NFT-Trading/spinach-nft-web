import {ObjectId} from 'mongodb';


export type GoldPurchaseTwBankRecord = {
  accountId: ObjectId,
  sourceBankDetailsUuid: string,
  targetWalletId: ObjectId,
  uuid: string,
  amount: number,
};
