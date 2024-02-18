import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {NextImage} from '@spinach/next/components/shared/common/image/main';
import {PageLayout} from '@spinach/next/ui/base/layout/base/common';


type Props = {
  disableHomePageLink?: boolean,
};

export const UserControlLayout = ({disableHomePageLink, children}: React.PropsWithChildren<Props>) => {
  return (
    <PageLayout disableHomePageLink={disableHomePageLink} hideUserControl>
      <Flex direction="row">
        <Flex className="self-center md:basis-5/12 xl:basis-4/12">
          {children}
        </Flex>
        <div className="relative hidden h-[32rem] self-end md:block md:basis-7/12 xl:basis-8/12">
          <NextImage
            src="/decoration/interactive.png"
            alt="Decoration"
            noCover
            className="object-contain"
          />
        </div>
      </Flex>
    </PageLayout>
  );
};
