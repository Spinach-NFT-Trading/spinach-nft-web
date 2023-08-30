import React from 'react';

import {NextImage} from '@spinach/next/components/shared/common/image';
import {imageIconSizes} from '@spinach/next/styles/image';


export const ProfileIcon = () => {
  return (
    <div className="rounded-full bg-blue-900 p-1.5">
      <div className="relative h-12 w-12">
        <NextImage
          src="/logo-half.png"
          alt="NFT Market 3.0"
          sizes={imageIconSizes}
          noCover
          className="invert-hoverable object-contain"
        />
      </div>
    </div>
  );
};
