'use client';
import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Session} from 'next-auth';

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
    <Link
      href={isCurrent ? '#' : href}
      className={clsx(
        'nav-height button-base button-text relative flex items-center justify-center px-2',
        isCurrent ? 'cursor-auto bg-slate-700/30 dark:bg-slate-300/30' : 'button-clickable group',
      )}
    >
      {text}
    </Link>
  );
};
