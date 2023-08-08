import React from 'react';

import clsx from 'clsx';
import Image, {ImageProps} from 'next/image';


export type NextImageProps = Omit<ImageProps, 'fill' | 'title'>;

export const NextImage = ({src, alt, sizes, className}: NextImageProps) => {
  return (
    <Image
      src={src} alt={alt} fill title={alt} sizes={sizes}
      className={clsx(className, 'object-cover')} unoptimized
    />
  );
};
