import {UserDataActionStatus, UserLazyLoadedData} from '@spinach/next/types/userData/main';


export type UserDataActorState = {
  status: UserDataActionStatus,
  lazyLoaded: UserLazyLoadedData,
};
