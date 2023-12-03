import React from 'react';

import {Failed} from '@spinach/next/components/icons/failed';
import {
  AdminVerificationImageContent,
} from '@spinach/next/components/shared/admin/verification/popup/image/content';
import {
  AdminVerificationCollapsibleState,
  AdminVerificationGetImageFromPayload,
} from '@spinach/next/components/shared/admin/verification/type';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';


type Props = {
  state: AdminVerificationCollapsibleState,
  getImageData: AdminVerificationGetImageFromPayload,
};

export const AdminVerificationImage = ({state, getImageData}: Props) => {
  const {payload} = state;

  if (!payload) {
    return <Failed text="沒有指定要顯示的照片。"/>;
  }

  const {opts, imageName} = payload;

  return (
    <UserDataLazyLoad
      options={opts}
      loadingText={imageName}
      content={(data) => (
        <AdminVerificationImageContent data={getImageData(data, payload)} name={imageName}/>
      )}
    />
  );
};
