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
      <div className="relative h-8 w-60">
        <NextImage
          src="/logo.png"
          alt="NFT Market 3.0"
          sizes={imageGallerySizes}
          className="invert-hoverable object-cover"
        />
      </div>
    </Link>
  );
};
