import {UserInfo} from '@spinach/common/types/common/user';


export type AdminMemberPopupProps = {
  member: UserInfo,
};

export type AdminMemberPopupContentProps = AdminMemberPopupProps & {
  type: AdminMemberPopupType,
};

export type AdminMemberPopupType = 'info' | 'bankDetails' | 'nftTxn' | 'balanceHistory';

export type AdminMemberPopupState = {
  type: AdminMemberPopupType,
  show: boolean,
  member: UserInfo | null,
};
