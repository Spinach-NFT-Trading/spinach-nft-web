import {ApiErrorCode} from '@spinach/common/types/api/error';


export type LoginPageParams = {
  params: {},
  searchParams: {
    error?: ApiErrorCode,
    callbackUrl?: string,
  },
};
