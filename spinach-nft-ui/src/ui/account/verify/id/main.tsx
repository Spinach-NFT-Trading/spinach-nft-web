import React from 'react';

import {I18nProvider} from '@spinach/next/components/i18n/provider';
import {AccountIdVerifyClient} from '@spinach/next/ui/account/verify/id/client';
import {ProfileLayout} from '@spinach/next/ui/base/layout/profile/main';


export const AccountIdVerify = async () => {
  return (
    <ProfileLayout isValid={(session) => session?.user.status === 'rejected'}>
      <I18nProvider namespaces={[
        'UI.Account.IdType',
        'UI.Component.AccountIdVerificationForm',
        'UI.InPage.Account.Verify.Id',
      ]}>
        <AccountIdVerifyClient/>
      </I18nProvider>
    </ProfileLayout>
  );
};
