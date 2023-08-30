import React from 'react';

import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import clsx from 'clsx';
import Link from 'next/link';
import {Session} from 'next-auth';

import {Flex} from '@spinach/next/components/layout/flex';
import {ProfileIcon} from '@spinach/next/components/shared/account/icon';
import {ProfileBalanceSection} from '@spinach/next/ui/base/layout/profile/balance';


type Props = {
  session: Session,
};

export const ProfileLayoutAuthenticated = ({session, children}: React.PropsWithChildren<Props>) => {
  const {username, preloaded} = session.user;
  const assets = preloaded?.assets;

  return (
    <Flex direction="col" center className="gap-2">
      <ProfileIcon/>
      <div className="text-2xl text-slate-400">{username}</div>
      <Link href="/gold/exchange" className={clsx(
        'button-base button-text-hover button-bg p-1 px-1.5 text-base hover:bg-amber-400',
      )}>
        <Flex direction="row" className="gap-1">
          <div className="relative h-6 w-6">
            <PlusCircleIcon/>
          </div>
          <div>
            購買 GOLD
          </div>
        </Flex>
      </Link>
      <Flex direction="col" className="gap-2 md:flex-row">
        <ProfileBalanceSection title="NFT 資產" value={assets?.nft}/>
        <ProfileBalanceSection title="GOLD" value={assets?.gold}/>
        <ProfileBalanceSection title="總資產" value={(assets?.nft ?? 0) + (assets?.gold ?? 0)}/>
      </Flex>
      {children}
    </Flex>
  );
};

