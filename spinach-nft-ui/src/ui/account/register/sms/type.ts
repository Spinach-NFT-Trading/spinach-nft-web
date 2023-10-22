import {ApiErrorCode} from '@spinach/common/types/api/error';


export type AccountRegisterSmsVerificationState = {
  phone: string,
  otp: string,
  loading: boolean,
  verificationKey: string | null,
  error: ApiErrorCode | null,
  initialized: boolean,
  finalized: boolean,
};
