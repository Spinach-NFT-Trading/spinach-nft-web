import React from 'react';

import {ApiErrorCode} from '@spinach/common/types/api/error';
import {ByteArray} from '@spinach/common/types/common/binary';

import {UserLazyLoadedContent} from '@spinach/next/types/userData/lazyLoaded';
import {UserDataLoadingOpts} from '@spinach/next/types/userData/load';
import {UserDataRequestOpts} from '@spinach/next/types/userData/upload';


export type AdminVerificationImageRequestPayload = {
  opts: UserDataLoadingOpts,
  imageName: string,
};

export type AdminVerificationCollapsibleState = {
  error: ApiErrorCode | null,
} & ({
  show: 'image',
  payload: AdminVerificationImageRequestPayload,
} | {
  show: 'confirm' | null,
  payload: null,
});

export type AdminVerificationGetImageFromPayload = (
  data: Partial<UserLazyLoadedContent> | null | undefined,
  payload: AdminVerificationImageRequestPayload
) => ByteArray | null | undefined;

export type AdminVerificationCollapsibleProps<TData> = {
  data: TData,
  getTitle: (data: TData) => React.ReactNode,
  getInfo: (data: TData) => React.ReactNode,
  getImageRequestPayload: (data: TData) => AdminVerificationImageRequestPayload[],
  getImageData: AdminVerificationGetImageFromPayload,
  getConfirmPayload: (data: TData, pass: boolean) => UserDataRequestOpts,
  onVerified: () => void,
};
