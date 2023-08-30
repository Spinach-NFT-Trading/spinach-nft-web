import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import {NextImage} from '@spinach/next/components/shared/common/image';
import {imageGallerySizes} from '@spinach/next/styles/image';


export const NavHomepage = () => {
  return (
    <Link href="/" className={clsx(
      'transform-smooth nav-height button-bg-hover group sticky left-0 flex items-center rounded-lg px-1.5',
    )}>
      <div className="nav-height relative hidden w-72 md:block">
        <NextImage
          src="/logo-full.png"
          alt="NFT Market 3.0"
          sizes={imageGallerySizes}
          noCover
          className="invert-hoverable object-contain"
        />
      </div>
      <div className="nav-height relative block w-10 md:hidden">
        <NextImage
          src="/logo-half.png"
          alt="NFT Market 3.0"
          sizes={imageGallerySizes}
          noCover
          className="invert-hoverable object-contain"
        />
      </div>
    </Link>
  );
};
