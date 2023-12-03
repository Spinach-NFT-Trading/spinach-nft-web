import React from 'react';

import {AccountAddBankClient} from '@spinach/next/ui/account/bank/client';
import {ProfileLayout} from '@spinach/next/ui/base/layout/profile/main';


export const AccountAddBank = () => {
  return (
    <ProfileLayout>
      <AccountAddBankClient/>
    </ProfileLayout>
  );
};
