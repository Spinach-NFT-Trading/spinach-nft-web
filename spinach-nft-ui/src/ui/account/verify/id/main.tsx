import React from 'react';

import {AccountIdVerifyClient} from '@spinach/next/ui/account/verify/id/client';
import {ProfileLayout} from '@spinach/next/ui/base/layout/profile/main';


export const AccountIdVerify = async () => {
  return (
    <ProfileLayout isValid={(session) => session?.user.status === 'rejected'}>
      <AccountIdVerifyClient/>
    </ProfileLayout>
  );
};
