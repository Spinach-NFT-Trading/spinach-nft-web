import {UserDataActionStatus} from '@spinach/next/types/userData/main';
import {GoldExchangeConfirmTwBankInput} from '@spinach/next/ui/gold/confirm/twBank/type';


export const goldExchangeUploadStatus: {[status in UserDataActionStatus]: string} = {
  waiting: '上傳轉帳紀錄',
  processing: '上傳中...',
  completed: '上傳完成',
  failed: '上傳失敗！',
};

export const goldExchangeTwBankInitialInput: GoldExchangeConfirmTwBankInput = {
  sourceBankDetailsUuid: null,
  txnProofImage: null,
  errorMessage: null,
  bankDetailsSearch: '',
};
