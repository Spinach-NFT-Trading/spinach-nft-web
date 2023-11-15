import React from 'react';

import {getServerSession} from 'next-auth';

import {Grid} from '@spinach/next/components/layout/grid';
import {TileLink} from '@spinach/next/components/shared/link';
import {authOptions} from '@spinach/next/const/auth';
import {ProfileLayout} from '@spinach/next/ui/base/layout/profile/main';


export const AccountIndex = () => {
  const session = React.use(getServerSession(authOptions));

  return (
    <ProfileLayout>
      <Grid className="gap-2 text-3xl lg:grid-cols-2">
        <TileLink link="/account/profile" text="會員資料"/>
        <TileLink link="/account/position" text="NFT 持倉"/>
        {session?.user.isAdmin && <TileLink link="/admin" text="會員管理"/>}
      </Grid>
    </ProfileLayout>
  );
};
