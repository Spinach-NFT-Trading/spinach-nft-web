import React from 'react';

import {Flex} from '@/components/layout/flex';
import {NavBarClient} from '@/ui/base/navbar/client';
import {UserControl} from '@/ui/base/navbar/user/main';


export const NavBar = () => {
  return (
    <Flex
      direction="row" center
      className="sticky top-0 z-30 gap-1.5 border-b border-b-gray-700 bg-slate-300/90 p-2 dark:bg-slate-900/90"
    >
      <NavBarClient/>
      <UserControl/>
    </Flex>
  );
};
