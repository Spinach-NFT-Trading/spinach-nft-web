import {UserInfo} from '@spinach/common/types/common/user/info';


export type AdminMemberPopupProps = {
  member: UserInfo,
  setShow: (show: boolean) => void,
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
  'idVerificationImages';

export type AdminMemberPopupState = {
  type: AdminMemberPopupType,
  show: boolean,
  member: UserInfo | null,
};
