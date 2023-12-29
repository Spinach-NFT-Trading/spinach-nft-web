import {ApiErrorCode} from '@spinach/common/types/api/error';

import {NextPageProps} from '@spinach/next/types/next/page';


export type AccountLoginInput = {
  username: string,
  password: string,
};

export type AccountLoginPageProps = NextPageProps<
  {},
  {
    error?: ApiErrorCode,
    callbackUrl?: string,
  }
>;
