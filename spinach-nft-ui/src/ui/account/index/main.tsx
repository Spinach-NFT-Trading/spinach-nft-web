import React from 'react';

import {Grid} from '@spinach/next/components/layout/grid';
import {AccountInfoLink} from '@spinach/next/ui/account/index/link';
import {ProfileLayout} from '@spinach/next/ui/base/layout/profile/main';


export const AccountIndex = () => {
  return (
    <ProfileLayout>
      <Grid className="gap-2 text-3xl lg:grid-cols-2">
        <AccountInfoLink link="/account/profile" text="會員資料"/>
        <AccountInfoLink link="/account/position" text="NFT 持倉"/>
      </Grid>
    </ProfileLayout>
  );
};
