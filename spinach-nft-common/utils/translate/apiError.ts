import {smsVerificationExpiry, smsVerifiedExpiry} from '@spinach/common/const/smsVerify';
import {ApiErrorCode, isApiError} from '@spinach/common/types/api/error';


const apiErrorStringMap: {[code in ApiErrorCode]: string} = {
  accountNotFound: '找不到對應的帳號。',
  accountDisabled: '帳號已被停用。',
  agentNotFound: '找不到對應的代理。',
  agentInactive: '申請連結對應的代理無效。',
  passwordMismatch: '密碼不正確。',
  takenIdNumber: '身份證字號已被使用。',
  takenEmail: '電子信箱已被使用。',
  takenLineId: 'LINE ID 已被使用。',
  takenName: '姓名已被使用。',
  takenUsername: '帳號 ID 已被使用。',
  takenWallet: 'MAX 錢包已被使用。',
  goldExchangeInProgress: 'GOLD 購買程序已在進行中，請稍後再試。',
  goldNotEnough: 'GOLD 不足。',
  goldTwBankTxnRecordFailed: '台幣轉帳紀錄上傳失敗。',
  goldTwBankTxnNotFound: '沒有找到對應的台幣轉帳紀錄。',
  nftNotOnSale: 'NFT 不在販賣中。',
  walletInvalid: '錢包地址無效。',
  walletNotExist: '錢包地址不存在。',
  smsSendFailed: '驗證簡訊傳送失敗。',
  smsAlreadyRequested: `已要求傳送驗證簡訊，請於 ${(smsVerificationExpiry / 60).toFixed(0)} 分鐘後重試。`,
  smsPhoneInvalid: '手機號碼驗證無效或已失效。請重新驗證手機號碼。',
  smsPhoneUsed: `手機號碼已被使用。請於 ${(smsVerifiedExpiry / 60).toFixed(0)} 分鐘後重試。`,
  smsPhoneRegistered: '手機號碼已註冊。',
  smsCodeInvalid: '驗證碼無效。請',
  idNumberInvalid: '無效的身份證字號。',
  bankDetailsNotFound: '銀行帳號不存在。',
  bankDetailsAlreadyExist: '銀行帳號已存在。',
  bankDetailsUploadFailed: '銀行帳號上傳失敗。',
  commissionOverLimit: '超過退傭上限。',
};

export const translateApiError = (error: string): string => {
  if (isApiError(error)) {
    return apiErrorStringMap[error];
  }

  return error;
};
