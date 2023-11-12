import React from 'react';

import {AccountProfileClient} from '@spinach/next/ui/account/profile/client';
import {ProfileLayout} from '@spinach/next/ui/base/layout/profile/main';


export const AccountProfile = async () => {
  return (
    <ProfileLayout>
      <AccountProfileClient/>
    </ProfileLayout>
  );
};
