import React from 'react';

import {generateFileUploadGrant} from '@spinach/common/controller/actors/fileUpload';

import {I18nProvider} from '@spinach/next/components/i18n/provider';
import {AccountIdVerifyClient} from '@spinach/next/ui/account/verify/id/client';
import {ProfileLayout} from '@spinach/next/ui/base/layout/profile/main';


export const AccountIdVerify = async () => {
  const fileUploadGrantId = await generateFileUploadGrant();

  return (
    <ProfileLayout isValid={(session) => session?.user.status === 'rejected'}>
      <I18nProvider>
        <AccountIdVerifyClient fileUploadGrantId={fileUploadGrantId}/>
      </I18nProvider>
    </ProfileLayout>
  );
};
