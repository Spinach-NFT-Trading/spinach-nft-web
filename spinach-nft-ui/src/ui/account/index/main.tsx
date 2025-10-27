import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import InboxIcon from '@heroicons/react/24/outline/InboxIcon';
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon';
import {getServerSession} from 'next-auth';
import {getTranslations} from 'next-intl/server';

import {Grid} from '@spinach/next/components/layout/grid';
import {TileLink} from '@spinach/next/components/shared/link';
import {authOptions} from '@spinach/next/const/auth';
import {ProfileLayout} from '@spinach/next/ui/base/layout/profile/main';
import {isUserElevated} from '@spinach/next/utils/data/user';


export const AccountIndex = async () => {
  const [
    session,
    t,
  ] = await Promise.all([
    getServerSession(authOptions),
    getTranslations('UI.InPage.Account.Index'),
  ]);

  return (
    <ProfileLayout>
      <Grid className="gap-2 text-3xl lg:grid-cols-2">
        <TileLink link="/account/profile" text={t('Profile')} icon={<MagnifyingGlassIcon/>}/>
        <TileLink link="/account/nft/position" text={t('NftPositions')} icon={<InboxIcon/>}/>
        <TileLink link="/account/nft/position/limited" text={t('NftLimitedPositions')} icon={<InboxIcon/>}/>
        <TileLink link="/account/nft/exchange" text={t('NftExchangeConfirm')} icon={<CheckCircleIcon/>}/>
        {isUserElevated(session?.user) && <TileLink link="/admin" text={t('Admin')} icon={<UserCircleIcon/>}/>}
      </Grid>
    </ProfileLayout>
  );
};
