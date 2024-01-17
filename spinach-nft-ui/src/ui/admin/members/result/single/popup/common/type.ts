import {UserLazyLoadedContent} from '@spinach/next/types/userData/lazyLoaded';
import {UserTimelineLookBackRequest} from '@spinach/next/types/userData/load';
import {UserDataActionStatus} from '@spinach/next/types/userData/main';


export type AdminLookBackPopupRequest = UserTimelineLookBackRequest & {
  timestamp: number,
};

export type AdminTimelineLookBackLayoutRenderChildrenOpts = {
  status: UserDataActionStatus,
  lazyLoaded: Partial<UserLazyLoadedContent>,
};
