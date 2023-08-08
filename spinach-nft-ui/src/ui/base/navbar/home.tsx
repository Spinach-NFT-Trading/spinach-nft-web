import React from 'react';

import HomeIcon from '@heroicons/react/24/solid/HomeIcon';
import clsx from 'clsx';
import Link from 'next/link';


export const NavHomepage = () => {
  return (
    <Link href="/" className={clsx(
      'transform-smooth nav-height sticky left-0 flex flex-row items-center gap-1 rounded-lg px-1.5',
      'button-clickable-bg',
    )}>
      <div className="whitespace-nowrap">
        <span className="hidden md:block">菠菜 NFT 交易平台</span>
        <span className="block md:hidden">
          <div className="h-6 w-6">
            <HomeIcon/>
          </div>
        </span>
      </div>
    </Link>
  );
};
