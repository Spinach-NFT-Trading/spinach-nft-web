import React from 'react';

import {redirect} from 'next/navigation';
import {getServerSession} from 'next-auth';

import {authOptions} from '@spinach/next/const/auth';
import {LoginPageParams} from '@spinach/next/types/next/auth';
import {AccountLoginClient} from '@spinach/next/ui/account/login/client';
import {PageLayout} from '@spinach/next/ui/base/layout/common';


export const AccountLogin = ({searchParams}: LoginPageParams) => {
  const session = React.use(getServerSession(authOptions));
  if (session) {
    redirect(searchParams.callbackUrl ?? '/');
  }

  return (
    <PageLayout>
      <AccountLoginClient error={searchParams.error}/>
    </PageLayout>
  );
};
