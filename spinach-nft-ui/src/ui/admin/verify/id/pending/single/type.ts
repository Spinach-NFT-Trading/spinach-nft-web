import {ApiErrorCode} from '@spinach/common/types/api/error';
import {AccountIdVerificationType} from '@spinach/common/types/api/profile/id';


export type AdminPendingVerificationState = {
  show: boolean,
  type: AccountIdVerificationType | null,
  userId: string | null,
  error: ApiErrorCode | null,
};
