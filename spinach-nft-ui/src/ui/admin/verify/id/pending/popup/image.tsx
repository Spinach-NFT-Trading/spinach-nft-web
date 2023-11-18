import React from 'react';

import {byteArrayToDataUri} from '@spinach/common/utils/data';

import {Failed} from '@spinach/next/components/icons/failed';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {NextImageAutoHeight} from '@spinach/next/components/shared/common/image/autoHeight';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';
import {accountIdVerificationTypeText} from '@spinach/next/const/account';
import {AdminPendingVerificationPopupState} from '@spinach/next/ui/admin/verify/id/pending/popup/type';


type Props = {
  state: AdminPendingVerificationPopupState,
};

export const AdminPendingVerificationImage = ({state}: Props) => {
  const {type, userId} = state;

  if (!type || !userId) {
    return <Failed text="無照片 ID 種類或內部用戶 ID。"/>;
  }

  const imageName = accountIdVerificationTypeText[type];

  return (
    <Flex noFullWidth className="w-full p-2 sm:w-[60vw]">
      <UserDataLazyLoad
        options={{
          type: 'adminImageOfId',
          opts: {type, userId},
        }}
        loadingText={imageName}
        content={async (session) => {
          const data = session?.adminImageOfId?.data;
          if (!data) {
            return null;
          }

          const dataUri = await byteArrayToDataUri(data);
          if (!dataUri) {
            return null;
          }

          return <NextImageAutoHeight src={dataUri} alt={imageName}/>;
        }}
      />
    </Flex>
  );
};
