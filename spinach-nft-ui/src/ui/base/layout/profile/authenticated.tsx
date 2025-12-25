import React from 'react';

import {clsx} from 'clsx';
import {getTranslations} from 'next-intl/server';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {ProfileBalanceSection} from '@spinach/next/ui/base/layout/profile/balance';
import {ProfileLayoutControls} from '@spinach/next/ui/base/layout/profile/control';
import {ProfileLayoutInfo} from '@spinach/next/ui/base/layout/profile/info';
import {ProfileLayoutProps} from '@spinach/next/ui/base/layout/profile/type';


export const ProfileLayoutAuthenticated = async ({session, children}: React.PropsWithChildren<ProfileLayoutProps>) => {
  const t = await getTranslations('UI.Account.Assets');

  const {preloaded} = session.user;
  const assets = preloaded?.assets;

  return (
    <Flex className="gap-2">
      <Flex center className="gap-3 md:flex-row">
        <ProfileLayoutInfo session={session}/>
        <ProfileLayoutControls/>
      </Flex>
      <Flex center className={clsx(
        'gap-2 rounded-lg bg-gradient-to-br from-slate-500/70 to-slate-900/90 p-4 md:flex-row',
      )}>
        <ProfileBalanceSection title={t('Nft')} value={assets?.nft}/>
        <ProfileBalanceSection title={t('Gold')} value={assets?.gold}/>
        <ProfileBalanceSection title={t('Total')} value={(assets?.nft ?? 0) + (assets?.gold ?? 0)}/>
      </Flex>
      {children}
    </Flex>
  );
};
