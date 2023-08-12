import {ApiErrorCode, isApiError} from '@spinach/common/types/api/error';


const apiErrorStringMap: {[code in ApiErrorCode]: string} = {
  accountNotFound: '找不到對應的帳號。',
  passwordMismatch: '密碼不正確。',
  takenEmail: '電子信箱已被使用。',
  takenLineId: 'LINE ID 已被使用。',
  takenName: '姓名已被使用。',
  takenPhone: '手機號碼已被使用。',
  takenUsername: '帳號 ID 已被使用。',
  takenWallet: 'MAX 錢包已被使用。',
  goldExchangeInProgress: 'GOLD 購買程序已在進行中，請稍後再試。',
};

export const translateApiError = (error: string): string => {
  if (isApiError(error)) {
    return apiErrorStringMap[error];
  }

  return error;
};
