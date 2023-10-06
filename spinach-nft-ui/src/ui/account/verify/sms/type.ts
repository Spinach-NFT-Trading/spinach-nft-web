import {ApiErrorCode} from '@spinach/common/types/api/error';


export type AccountVerifySmsInput = {
  phone: string,
  code: string,
};

export type AccountVerifySmsState = {
  phone: string,
  requested: boolean,
  code: string,
  loading: boolean,
  error: ApiErrorCode | null,
};
