import React from 'react';

import {getServerSession} from 'next-auth';

import {SignIn} from '@spinach/next/components/auth/signIn';
import {authOptions} from '@spinach/next/const/auth';
import {PageLayout} from '@spinach/next/ui/base/layout/common';
import {PageLayoutProps} from '@spinach/next/ui/base/layout/type';


export const LoginRequiredPageLayout = ({announcement, children}: React.PropsWithChildren<PageLayoutProps>) => {
  const session = React.use(getServerSession(authOptions));

  return (
    <PageLayout announcement={announcement}>
      {session ? children : <SignIn/>}
    </PageLayout>
  );
};
