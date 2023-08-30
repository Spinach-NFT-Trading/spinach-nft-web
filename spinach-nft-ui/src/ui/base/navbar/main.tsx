import React from 'react';

import clsx from 'clsx';
import {getServerSession} from 'next-auth';

import {Flex} from '@spinach/next/components/layout/flex';
import {authOptions} from '@spinach/next/const/auth';
import {NavBarClient} from '@spinach/next/ui/base/navbar/client';
import {NavBarProps} from '@spinach/next/ui/base/navbar/type';
import {UserControl} from '@spinach/next/ui/base/navbar/user/main';


export const NavBar = ({hideUserControl}: NavBarProps) => {
  const session = React.use(getServerSession(authOptions));

  return (
    <Flex direction="row" center className={clsx(
      'sticky top-0 z-30 gap-1.5 border-b border-b-gray-700 p-2 backdrop-blur-lg lg:px-32',
    )}>
      <NavBarClient session={session}/>
      {!hideUserControl && <UserControl/>}
    </Flex>
  );
};
