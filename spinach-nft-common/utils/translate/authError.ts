import {AuthErrorCode, isAuthError} from '@/types/api/auth/error';


const authErrorStringMap: {[code in AuthErrorCode]: string} = {
  accountNotFound: '找不到對應的帳號。',
  passwordMismatch: '密碼不正確。',
  takenEmail: '電子信箱已被使用。',
  takenLineId: 'LINE ID 已被使用。',
  takenName: '姓名已被使用。',
  takenPhone: '手機號碼已被使用。',
  takenUsername: '帳號 ID 已被使用。',
  takenWallet: 'MAX 錢包已被使用。',
};

export const translateAuthError = (error: string): string => {
  if (isAuthError(error)) {
    return authErrorStringMap[error];
  }

  return error;
};
