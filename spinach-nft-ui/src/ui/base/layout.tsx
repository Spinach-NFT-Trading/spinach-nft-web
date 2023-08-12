import React from 'react';

import {Announcements} from '@spinach/next/components/announcement/main';
import {Flex} from '@spinach/next/components/layout/flex';
import {NavBar} from '@spinach/next/ui/base/navbar/main';


type Props = {
  announcement?: boolean,
};

export const PageLayout = ({announcement = true, children}: React.PropsWithChildren<Props>) => {
  return (
    <main className="min-h-full w-full">
      <NavBar/>
      <Flex direction="col" className="gap-1.5 p-2">
        {announcement && <Announcements/>}
        {children}
      </Flex>
    </main>
  );
};
