import React from 'react';

import {Failed} from '@spinach/next/components/icons/failed';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';
import {accountIdVerificationTypeText} from '@spinach/next/const/account';
import {
  AdminPendingVerificationImageContent,
} from '@spinach/next/ui/admin/verify/id/pending/single/popup/image/content';
import {AdminPendingVerificationState} from '@spinach/next/ui/admin/verify/id/pending/single/type';


type Props = {
  state: AdminPendingVerificationState,
};

export const AdminPendingVerificationImage = ({state}: Props) => {
  const {type, userId} = state;

  if (!type || !userId) {
    return <Failed text="無照片 ID 種類或內部用戶 ID。"/>;
  }

  const imageName = accountIdVerificationTypeText[type];

  return (
    <UserDataLazyLoad
      options={{
        type: 'adminImageOfId',
        opts: {type, userId},
      }}
      loadingText={imageName}
      content={(session) => (
        <AdminPendingVerificationImageContent data={session?.adminImageOfId?.data} name={imageName}/>
      )}
    />
  );
};
