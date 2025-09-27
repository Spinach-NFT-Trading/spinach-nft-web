import React from 'react';

import {I18nProvider} from '@spinach/next/components/i18n/provider';
import {AccountAddBankClient} from '@spinach/next/ui/account/bank/client';
import {ProfileLayout} from '@spinach/next/ui/base/layout/profile/main';


export const AccountAddBank = () => {
  return (
    <ProfileLayout>
      <I18nProvider>
        <AccountAddBankClient/>
      </I18nProvider>
    </ProfileLayout>
  );
};
