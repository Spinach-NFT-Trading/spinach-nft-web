'use client';
import React from 'react';

import clsx from 'clsx';

import {Flex} from '@spinach/next/components/layout/flex';
import {useNavEntries} from '@spinach/next/hooks/nav';
import {ThemeSwitcher} from '@spinach/next/ui/base/navbar/darkMode/main';
import {NavEntryUI} from '@spinach/next/ui/base/navbar/entry';
import {NavHomepage} from '@spinach/next/ui/base/navbar/home';


export const NavBarClient = () => {
  const entries = useNavEntries();

  return (
    <>
      <NavHomepage/>
      <Flex direction="row" className={clsx(
        'scrollbar-hide gap-1 overflow-x-auto overflow-y-hidden text-center text-sm text-gray-400',
      )}>
        {entries.map((entry) => (
          <div key={entry.href} className="nav-height">
            <NavEntryUI {...entry}/>
          </div>
        ))}
      </Flex>
      <Flex direction="row" center noFullWidth className="ml-auto gap-1.5">
        <ThemeSwitcher/>
      </Flex>
    </>
  );
};
