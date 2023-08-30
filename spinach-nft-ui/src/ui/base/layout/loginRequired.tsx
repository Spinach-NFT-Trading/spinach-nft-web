import React from 'react';

import {getServerSession, Session} from 'next-auth';

import {SignIn} from '@spinach/next/components/auth/signIn';
import {authOptions} from '@spinach/next/const/auth';
import {PageLayout} from '@spinach/next/ui/base/layout/common';
import {PageLayoutProps} from '@spinach/next/ui/base/layout/type';


type Props = PageLayoutProps & {
  sessionOverride?: Session | null,
};

export const LoginRequiredPageLayout = ({announcement, sessionOverride, children}: React.PropsWithChildren<Props>) => {
  const session = React.use(
    sessionOverride ?
      Promise.resolve(sessionOverride) :
      getServerSession(authOptions),
  );

  return (
    <PageLayout announcement={announcement}>
      {session ? children : <SignIn/>}
    </PageLayout>
  );
};
