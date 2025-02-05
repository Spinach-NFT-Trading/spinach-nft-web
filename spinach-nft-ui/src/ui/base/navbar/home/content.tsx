import React from 'react';

import {projectName} from '@spinach/common/const/project';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {NextImage} from '@spinach/next/components/shared/common/image/main';
import {imageGallerySizes} from '@spinach/next/styles/image';


export const NavHomepageContent = () => {
  return (
    <Flex direction="row" noFullWidth className="nav-height items-end px-1.5">
      <div className="nav-height relative w-14">
        <NextImage
          src="/logo-half.png"
          alt={projectName}
          sizes={imageGallerySizes}
          noCover
          className="invert-hoverable object-contain filter-logo"
        />
      </div>
    </Flex>
  );
};
