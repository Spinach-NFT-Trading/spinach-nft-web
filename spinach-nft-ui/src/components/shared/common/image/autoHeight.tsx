import React from 'react';

import Image from 'next/image';


type Props = {
  src: string,
  alt: string,
};

export const NextImageAutoHeight = ({src, alt}: Props) => {
  return (
    <Image src={src} alt={alt} width={0} height={0} sizes="100vw" className="h-auto w-full"/>
  );
};
