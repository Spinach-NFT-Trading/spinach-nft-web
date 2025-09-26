import React from 'react';

import {generateFileUploadGrant} from '@spinach/common/controller/actors/fileUpload';

import {I18nProvider} from '@spinach/next/components/i18n/provider';
import {AccountAddBankClient} from '@spinach/next/ui/account/bank/client';
import {ProfileLayout} from '@spinach/next/ui/base/layout/profile/main';


export const AccountAddBank = async () => {
  const fileUploadGrantId = await generateFileUploadGrant();

  return (
    <ProfileLayout>
      <I18nProvider>
        <AccountAddBankClient fileUploadGrantId={fileUploadGrantId}/>
      </I18nProvider>
    </ProfileLayout>
  );
};
