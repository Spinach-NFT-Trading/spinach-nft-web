import {AuthErrorCode, isAuthError} from '@/types/api/auth/error';


const authErrorStringMap: {[code in AuthErrorCode]: string} = {
  accountNotFound: '找不到對應的帳號。',
};

export const translateAuthError = (error: string): string => {
  if (isAuthError(error)) {
    return authErrorStringMap[error];
  }

  return error;
};
