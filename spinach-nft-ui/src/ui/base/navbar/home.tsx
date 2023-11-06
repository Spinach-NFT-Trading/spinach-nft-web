import React from 'react';

import clsx from 'clsx';

import {FlexLink} from '@spinach/next/components/layout/flex/link';
import {NextImage} from '@spinach/next/components/shared/common/image/main';
import {imageGallerySizes} from '@spinach/next/styles/image';


export const NavHomepage = () => {
  return (
    <FlexLink href="/" className={clsx(
      'transform-smooth nav-height button-bg-hover group sticky left-0 items-end rounded-lg px-1.5',
    )}>
      <div className="nav-height relative w-14">
        <NextImage
          src="/logo-half.png"
          alt="GT NFT Market"
          sizes={imageGallerySizes}
          noCover
          className="invert-hoverable object-contain"
        />
      </div>
      <div className="relative hidden h-8 w-24 md:block">
        <NextImage
          src="/logo-full.png"
          alt="GT NFT Market"
          sizes={imageGallerySizes}
          noCover
          className="invert-hoverable object-contain"
        />
      </div>
    </FlexLink>
  );
};
