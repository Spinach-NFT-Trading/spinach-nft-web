import {ObjectId} from 'mongodb';


export type GoldTwBankTxnRecord = {
  accountId: ObjectId,
  sourceBankDetailsUuid: string,
  targetWalletId: ObjectId,
  uuid: string,
  amount: number,
};
