import React from 'react';

import clsx from 'clsx';

import {Flex} from '@spinach/next/components/layout/flex';
import {ProfileBalanceSection} from '@spinach/next/ui/base/layout/profile/balance';
import {ProfileLayoutControls} from '@spinach/next/ui/base/layout/profile/control';
import {ProfileLayoutInfo} from '@spinach/next/ui/base/layout/profile/info';
import {ProfileLayoutProps} from '@spinach/next/ui/base/layout/profile/type';


export const ProfileLayoutAuthenticated = ({session, children}: React.PropsWithChildren<ProfileLayoutProps>) => {
  const {preloaded} = session.user;
  const assets = preloaded?.assets;

  return (
    <Flex direction="col" className="gap-2">
      <Flex direction="col" center className="gap-3 md:flex-row">
        <ProfileLayoutInfo session={session}/>
        <ProfileLayoutControls/>
      </Flex>
      <Flex direction="col" center className={clsx(
        'gap-2 rounded-lg bg-gradient-to-br from-slate-500/70 to-slate-900/90 p-4 md:flex-row',
      )}>
        <ProfileBalanceSection title="NFT 資產" value={assets?.nft}/>
        <ProfileBalanceSection title="GOLD" value={assets?.gold}/>
        <ProfileBalanceSection title="總資產" value={(assets?.nft ?? 0) + (assets?.gold ?? 0)}/>
      </Flex>
      {children}
    </Flex>
  );
};

