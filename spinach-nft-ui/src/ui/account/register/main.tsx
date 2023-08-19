import React from 'react';

import {redirect} from 'next/navigation';
import {getServerSession} from 'next-auth';

import {authOptions} from '@spinach/next/const/auth';
import {AccountRegisterClient} from '@spinach/next/ui/account/register/client';
import {PageLayout} from '@spinach/next/ui/base/layout/common';


export const AccountRegister = () => {
  const session = React.use(getServerSession(authOptions));
  if (session) {
    redirect('/');
  }

  return (
    <PageLayout>
      <AccountRegisterClient/>
    </PageLayout>
  );
};
