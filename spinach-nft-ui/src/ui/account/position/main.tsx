import React from 'react';

import {AccountNftPositionClient} from '@spinach/next/ui/account/position/position';
import {ProfileLayout} from '@spinach/next/ui/base/layout/profile/main';


export const AccountNftPosition = () => {
  return (
    <ProfileLayout>
      <AccountNftPositionClient/>
    </ProfileLayout>
  );
};
