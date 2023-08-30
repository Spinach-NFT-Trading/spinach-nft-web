import React from 'react';

import {AccountNftPosition} from '@spinach/next/ui/account/profile/position';
import {ProfileLayout} from '@spinach/next/ui/base/layout/profile/main';


export const AccountProfile = () => {
  return (
    <ProfileLayout>
      <AccountNftPosition/>
    </ProfileLayout>
  );
};
