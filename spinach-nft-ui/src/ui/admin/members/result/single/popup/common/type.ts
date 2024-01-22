import {UserLazyLoadedContent} from '@spinach/next/types/userData/lazyLoaded';
import {UserDataActionStatus} from '@spinach/next/types/userData/main';
import {AdminLookBackInput} from '@spinach/next/ui/admin/members/result/common/lookback/type';


export type AdminLookBackLayoutRenderChildrenOpts = {
  status: UserDataActionStatus,
  lazyLoaded: Partial<UserLazyLoadedContent>,
  input: AdminLookBackInput,
};

export type AdminLookBackRequestType =
  'adminMemberNftTxn' |
  'adminMemberBalanceDaily' |
  'adminMemberBalanceDetails';
