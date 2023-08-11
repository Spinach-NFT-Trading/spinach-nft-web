import React from 'react';

import {redirect} from 'next/navigation';
import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {AuthProvider} from '@/contexts/auth';
import {LoginPageParams} from '@/types/next/auth';
import {AccountLoginClient} from '@/ui/account/login/client';
import {PageLayout} from '@/ui/base/layout';


export const AccountLogin = ({searchParams}: LoginPageParams) => {
  const session = React.use(getServerSession(authOptions));
  if (session) {
    redirect(searchParams.callbackUrl ?? '/');
  }

  return (
    <PageLayout>
      <AuthProvider>
        <AccountLoginClient error={searchParams.error}/>
      </AuthProvider>
    </PageLayout>
  );
};
