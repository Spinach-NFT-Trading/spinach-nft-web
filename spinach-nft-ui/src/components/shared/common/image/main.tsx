import React from 'react';

import {clsx} from 'clsx';
import Image from 'next/image';

import {NextImageProps} from '@spinach/next/components/shared/common/image/type';


export const NextImage = ({src, alt, noCover, sizes, className}: NextImageProps) => {
  return (
    <Image
      src={src} alt={alt} fill title={alt} sizes={sizes}
      className={clsx(className, !noCover && 'object-cover')} unoptimized
    />
  );
};
