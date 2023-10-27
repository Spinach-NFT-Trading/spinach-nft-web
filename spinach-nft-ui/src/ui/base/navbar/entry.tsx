'use client';
import React from 'react';

import clsx from 'clsx';
import {usePathname} from 'next/navigation';
import {Session} from 'next-auth';

import {FlexLink} from '@spinach/next/components/layout/flex/link';
import {NavEntry} from '@spinach/next/types/nav';


type Props = NavEntry & {
  session: Session | null,
};

export const NavEntryUI = ({href, text, showOnlyIfLoggedIn, session}: Props) => {
  const pathname = usePathname();

  if (showOnlyIfLoggedIn && !session) {
    return <></>;
  }

  const isCurrent = href === pathname;

  return (
    <FlexLink href={isCurrent ? '#' : href} center className={clsx(
      'nav-height button-base relative px-2',
      isCurrent ? 'cursor-auto bg-slate-700/30' : 'button-clickable group',
    )}>
      {text}
    </FlexLink>
  );
};
