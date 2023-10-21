import React from 'react';

import {NextImage} from '@spinach/next/components/shared/common/image/main';
import {NextImageProps} from '@spinach/next/components/shared/common/image/type';


export const NextImageSquare = (props: NextImageProps) => {
  return (
    <div className="relative w-full overflow-hidden before:block before:pt-[100%] before:content-['']">
      <div className="absolute inset-0">
        <NextImage {...props}/>
      </div>
    </div>
  );
};

