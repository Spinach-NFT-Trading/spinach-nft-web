import {UserLazyLoadedContent} from '@spinach/next/types/userData/lazyLoaded';
import {DataLookBackRequest} from '@spinach/next/types/userData/load';
import {UserDataActionStatus} from '@spinach/next/types/userData/main';


export type AdminLookBackLayoutRenderChildrenOpts = {
  status: UserDataActionStatus,
  lazyLoaded: Partial<UserLazyLoadedContent>,
  input: DataLookBackRequest,
};

export type AdminLookBackRequestType =
  'adminMemberNftTxn' |
  'adminMemberBalanceDaily' |
  'adminMemberBalanceDetails';
