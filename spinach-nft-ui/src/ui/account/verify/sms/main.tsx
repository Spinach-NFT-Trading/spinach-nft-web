import React from 'react';

import {AccountVerifySmsClient} from '@spinach/next/ui/account/verify/sms/client';
import {ProfileLayout} from '@spinach/next/ui/base/layout/profile/main';


export const AccountVerifySms = () => {
  return (
    <ProfileLayout>
      <AccountVerifySmsClient/>
    </ProfileLayout>
  );
};
