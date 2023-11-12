import React from 'react';

import {Grid} from '@spinach/next/components/layout/grid';
import {TileLink} from '@spinach/next/components/shared/link';
import {ProfileLayout} from '@spinach/next/ui/base/layout/profile/main';


export const AccountIndex = () => {
  return (
    <ProfileLayout>
      <Grid className="gap-2 text-3xl lg:grid-cols-2">
        <TileLink link="/account/profile" text="會員資料"/>
        <TileLink link="/account/position" text="NFT 持倉"/>
      </Grid>
    </ProfileLayout>
  );
};
