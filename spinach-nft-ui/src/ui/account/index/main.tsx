import React from 'react';

import InboxIcon from '@heroicons/react/24/outline/InboxIcon';
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon';
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
        <TileLink link="/account/profile" text="會員資料" icon={<MagnifyingGlassIcon/>}/>
        <TileLink link="/account/position" text="NFT 持倉" icon={<InboxIcon/>}/>
        {session?.user.isAdmin && <TileLink link="/admin" text="會員管理" icon={<UserCircleIcon/>}/>}
      </Grid>
    </ProfileLayout>
  );
};
