import {UserInfo} from '@spinach/common/types/common/user';


export type AdminPendingVerificationState = {
  show: boolean,
  user: UserInfo | null,
};
