import {AuthErrorCode} from '@spinach/common/types/api/auth/error';


export type LoginPageParams = {
  params: {},
  searchParams: {
    error?: AuthErrorCode,
    callbackUrl?: string,
  },
};
