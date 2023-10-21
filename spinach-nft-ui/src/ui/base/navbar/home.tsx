import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import {NextImage} from '@spinach/next/components/shared/common/image/main';
import {imageGallerySizes} from '@spinach/next/styles/image';


export const NavHomepage = () => {
  return (
    <Link href="/" className={clsx(
      'transform-smooth nav-height button-bg-hover group sticky left-0 flex items-center gap-2 rounded-lg px-1.5',
    )}>
      <div className="nav-height relative w-10">
        <NextImage
          src="/logo-half.png"
          alt="GT NFT Market"
          sizes={imageGallerySizes}
          noCover
          className="invert-hoverable object-contain"
        />
      </div>
      <div className="nav-height relative hidden w-72 md:block">
        <NextImage
          src="/logo-full.png"
          alt="GT NFT Market"
          sizes={imageGallerySizes}
          noCover
          className="invert-hoverable object-contain"
        />
      </div>
    </Link>
  );
};
