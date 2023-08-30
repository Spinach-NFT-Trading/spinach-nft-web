import React from 'react';

import clsx from 'clsx';
import Image, {ImageProps} from 'next/image';


export type NextImageProps = Omit<ImageProps, 'fill' | 'title'> & {
  noCover?: boolean,
};

export const NextImage = ({src, alt, noCover, sizes, className}: NextImageProps) => {
  return (
    <Image
      src={src} alt={alt} fill title={alt} sizes={sizes}
      className={clsx(className, !noCover && 'object-cover')} unoptimized
    />
  );
};
