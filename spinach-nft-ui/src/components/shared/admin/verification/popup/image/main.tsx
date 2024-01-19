import React from 'react';

import {
  AdminVerificationImageContent,
} from '@spinach/next/components/shared/admin/verification/popup/image/content';
import {
  AdminVerificationGetImageFromPayload,
  AdminVerificationImageRequestPayload,
} from '@spinach/next/components/shared/admin/verification/type';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';


type Props = {
  payload: AdminVerificationImageRequestPayload,
  getImageData: AdminVerificationGetImageFromPayload,
};

export const AdminVerificationImage = ({payload, getImageData}: Props) => {
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
