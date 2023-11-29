import {ApiErrorCode} from '@spinach/common/types/api/error';
import {AccountIdVerificationType} from '@spinach/common/types/api/profile/id';
import {UserInfo} from '@spinach/common/types/common/user';


export type AdminPendingVerificationState = {
  show: 'image' | 'confirm' | null,
  type: AccountIdVerificationType | null,
  userId: string | null,
  error: ApiErrorCode | null,
};

export type AdminPendingVerificationProps = {
  user: UserInfo,
  onVerified: () => void,
};
