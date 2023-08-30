import React from 'react';

import {HorizontalSplitter} from '@spinach/next/components/shared/common/splitter';
import {AccountNftPosition} from '@spinach/next/ui/account/profile/position';
import {ProfileLayout} from '@spinach/next/ui/base/layout/profile/main';


export const AccountProfile = () => {
  return (
    <ProfileLayout>
      <HorizontalSplitter className="w-full"/>
      <AccountNftPosition/>
    </ProfileLayout>
  );
};
