import {Session} from 'next-auth';

import {UserLazyLoadedContent} from '@spinach/next/types/userData/lazyLoaded';
import {UserDataLoadingOpts} from '@spinach/next/types/userData/load';
import {UserPreloadedContent} from '@spinach/next/types/userData/preloaded';
import {UserDataRequestOpts} from '@spinach/next/types/userData/upload';
import {DeepPartialExceptKey} from '@spinach/next/utils/type';


export type UserPreloadedData = DeepPartialExceptKey<UserPreloadedContent>;

export type UserLazyLoadedData = Partial<UserLazyLoadedContent>;

export type UserDataActionStatus = 'waiting' | 'processing' | 'completed' | 'failed';

export type UserDataAction = {
  action: 'request',
  options: UserDataRequestOpts,
} | {
  action: 'load',
  options: UserDataLoadingOpts,
};

export type UserDataActor = (opts: UserDataAction) => Promise<Session | null>;
