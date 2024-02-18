'use client';
import React from 'react';

import clsx from 'clsx';
import {Session} from 'next-auth';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {useNavEntries} from '@spinach/next/hooks/nav';
import {NavEntryUI} from '@spinach/next/ui/base/navbar/entry';
import {NavHomepage} from '@spinach/next/ui/base/navbar/home/main';


type Props = {
  disableHomePageLink?: boolean,
  session: Session | null,
};

export const NavBarClient = ({disableHomePageLink, session}: Props) => {
  const entries = useNavEntries();

  return (
    <>
      <NavHomepage disableHomePageLink={disableHomePageLink}/>
      <Flex direction="row" className={clsx(
        'scrollbar-hide gap-1 overflow-x-auto overflow-y-hidden text-center text-sm text-gray-400',
      )}>
        {entries.map((entry) => (
          <div key={entry.href} className="nav-height">
            <NavEntryUI session={session} {...entry}/>
          </div>
        ))}
      </Flex>
    </>
  );
};
