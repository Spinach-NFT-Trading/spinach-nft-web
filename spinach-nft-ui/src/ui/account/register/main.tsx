import React from 'react';

import {redirect} from 'next/navigation';
import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {AccountRegisterClient} from '@/ui/account/register/client';
import {PageLayout} from '@/ui/base/layout';


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
