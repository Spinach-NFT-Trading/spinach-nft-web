import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex';
import {NextImage} from '@spinach/next/components/shared/common/image/main';
import {PageLayout} from '@spinach/next/ui/base/layout/common';


export const UserControlLayout = ({children}: React.PropsWithChildren<{}>) => {
  return (
    <PageLayout hideUserControl>
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
