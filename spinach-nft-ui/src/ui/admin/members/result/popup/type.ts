import {UserInfo} from '@spinach/common/types/common/user/info';

import {CommonUserData} from '@spinach/next/types/auth';


export type AdminMemberPopupProps = {
  actor: CommonUserData,
  member: UserInfo,
  setShow: (show: boolean) => void,
  refetch: () => void,
};

export type AdminMemberPopupContentProps = AdminMemberPopupProps & {
  type: AdminMemberPopupType,
};

export type AdminMemberPopupType =
  'info' |
  'bankDetails' |
  'nftTxn' |
  'balanceHistory' |
  'manualAdjust' |
  'idVerificationImages' |
  'setPassword';

export type AdminMemberPopupState = {
  type: AdminMemberPopupType,
  show: boolean,
  member: UserInfo | null,
};
