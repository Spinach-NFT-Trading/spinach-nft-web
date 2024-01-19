import React from 'react';

import {ByteArray} from '@spinach/common/types/common/binary';
import {Nullable} from '@spinach/common/types/common/typing';

import {AdminVerificationPopupData} from '@spinach/next/components/shared/admin/verification/popup/type';
import {UserLazyLoadedContent} from '@spinach/next/types/userData/lazyLoaded';
import {UserDataLoadingOpts} from '@spinach/next/types/userData/load';


export type AdminVerificationImageRequestPayload = {
  opts: UserDataLoadingOpts,
  imageName: string,
};

export type AdminVerificationGetImageFromPayload = (
  data: Nullable<Partial<UserLazyLoadedContent>>,
  payload: AdminVerificationImageRequestPayload
) => ByteArray | null | undefined;

export type AdminVerificationRowProps<TData> = {
  data: TData,
  getInfo: (data: TData) => React.ReactNode,
  getImageRequestPayload: (data: TData) => AdminVerificationImageRequestPayload[],
  getPopupData: (data: TData) => AdminVerificationPopupData<TData> | null,
};
