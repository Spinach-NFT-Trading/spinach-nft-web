import React from 'react';

import {ApiErrorCode} from '@spinach/common/types/api/error';
import {BinaryData} from '@spinach/common/types/common/binary';
import {Nullable} from '@spinach/common/types/common/typing';

import {AdminVerificationImageRequestPayload} from '@spinach/next/components/shared/admin/verification/type';
import {UserLazyLoadedContent} from '@spinach/next/types/userData/lazyLoaded';
import {UserDataRequestOpts} from '@spinach/next/types/userData/upload';


export type AdminVerificationPopupState<TData> = {
  show: boolean,
  error: ApiErrorCode | null,
} & ({
  type: 'image',
  payload: AdminVerificationImageRequestPayload,
} | {
  type: 'other' | 'confirm',
  payload: TData,
} | {
  type: null,
  payload: null,
});

export type AdminVerificationPopupControl<TData> = {
  state: AdminVerificationPopupState<TData>,
  setState: React.Dispatch<React.SetStateAction<AdminVerificationPopupState<TData>>>,
};

export type AdminVerificationPopupCommonProps<TData> = {
  onVerified: (data: TData) => void,
  renderOtherInfo: (data: TData) => React.ReactNode,
  getImageData: (lazyLoaded: Nullable<Partial<UserLazyLoadedContent>>) => BinaryData | null,
  getConfirmPayload: (pass: boolean, data: TData) => UserDataRequestOpts,
};

export type AdminVerificationPopupProps<TData> =
  AdminVerificationPopupCommonProps<TData> &
  AdminVerificationPopupControl<TData>;
