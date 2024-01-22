import {UserLazyLoadedContent} from '@spinach/next/types/userData/lazyLoaded';
import {DataLookBackRequest} from '@spinach/next/types/userData/load';
import {UserDataActionStatus} from '@spinach/next/types/userData/main';


export type AdminLookBackPopupRequest = {
  control: DataLookBackRequest,
  sent: DataLookBackRequest | null,
  timestamp: number,
};

export type AdminLookBackLayoutRenderChildrenOpts = {
  status: UserDataActionStatus,
  lazyLoaded: Partial<UserLazyLoadedContent>,
  request: AdminLookBackPopupRequest,
};

export type AdminLookBackRequestType =
  'adminMemberNftTxn' |
  'adminMemberBalanceDaily' |
  'adminMemberBalanceDetails';
