import {DeepPartialExceptKey} from '@spinach/common/types/common/typing';
import {Session} from 'next-auth';

import {UserLazyLoadedContent} from '@spinach/next/types/userData/lazyLoaded';
import {UserDataLoadingOpts} from '@spinach/next/types/userData/load';
import {UserPreloadedContent} from '@spinach/next/types/userData/preloaded';
import {UserDataRequestOpts} from '@spinach/next/types/userData/upload';


export type UserPreloadedData = DeepPartialExceptKey<UserPreloadedContent>;

export type UserLazyLoadedData = Partial<UserLazyLoadedContent>;

export type UserDataActionStatus = 'waiting' | 'processing' | 'completed' | 'failed';

export type UserDataAction = {
  // `request` only upload data, and does not expect a response
  action: 'request',
  options: UserDataRequestOpts,
} | {
  // `load` expects a response
  action: 'load',
  options: UserDataLoadingOpts,
};

export type UserDataActor = (opts: UserDataAction) => Promise<Session | null>;
