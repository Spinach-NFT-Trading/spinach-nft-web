import React from 'react';

import {Announcements} from '@spinach/next/components/announcement/main';
import {Flex} from '@spinach/next/components/layout/flex';
import {PageLayoutProps} from '@spinach/next/ui/base/layout/type';
import {NavBar} from '@spinach/next/ui/base/navbar/main';
import {NavBarProps} from '@spinach/next/ui/base/navbar/type';


type Props = PageLayoutProps & NavBarProps;

export const PageLayout = ({announcement = true, children, ...props}: React.PropsWithChildren<Props>) => {
  return (
    <main className="min-h-full w-full">
      <NavBar {...props}/>
      <Flex direction="col" className="gap-1.5 p-2">
        {announcement && <Announcements/>}
        {children}
      </Flex>
    </main>
  );
};
