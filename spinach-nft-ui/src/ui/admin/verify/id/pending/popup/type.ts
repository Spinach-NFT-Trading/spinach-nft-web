import {AccountIdVerificationType} from '@spinach/common/types/api/profile/id';


export type AdminPendingVerificationPopupState = {
  show: boolean,
  type: AccountIdVerificationType | null,
  userId: string | null,
};
