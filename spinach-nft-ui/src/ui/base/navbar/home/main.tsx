import React from 'react';

import clsx from 'clsx';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexLink} from '@spinach/next/components/layout/flex/link';
import {navHomepageCommonClass} from '@spinach/next/ui/base/navbar/home/const';
import {NavHomepageContent} from '@spinach/next/ui/base/navbar/home/content';


type Props = {
  disableHomePageLink?: boolean,
};

export const NavHomepage = ({disableHomePageLink}: Props) => {
  if (disableHomePageLink) {
    return (
      <Flex className={navHomepageCommonClass}>
        <NavHomepageContent/>
      </Flex>
    );
  }

  return (
    <FlexLink href="/" className={clsx(
      'transform-smooth button-bg-hover group rounded-lg',
      navHomepageCommonClass,
    )}>
      <NavHomepageContent/>
    </FlexLink>
  );
};
