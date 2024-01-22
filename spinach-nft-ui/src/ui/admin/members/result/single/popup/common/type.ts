import {UserLazyLoadedContent} from '@spinach/next/types/userData/lazyLoaded';
import {DataLookBackRequest} from '@spinach/next/types/userData/load';
import {UserDataActionStatus} from '@spinach/next/types/userData/main';


export type AdminLookBackPopupRequest = DataLookBackRequest & {
  timestamp: number,
};

export type AdminLookBackLayoutRenderChildrenOpts = {
  status: UserDataActionStatus,
  lazyLoaded: Partial<UserLazyLoadedContent>,
  request: AdminLookBackPopupRequest,
};

export type AdminLookBackRequestType =
  'adminMemberNftTxn' |
  'adminMemberBalanceDetails';
