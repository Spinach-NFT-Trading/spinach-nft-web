import React from 'react';

import {redirect} from 'next/navigation';
import {getServerSession} from 'next-auth';

import {authOptions} from '@spinach/next/const/auth';
import {AccountLoginClient} from '@spinach/next/ui/account/login/client';
import {AccountLoginPageProps} from '@spinach/next/ui/account/login/type';
import {UserControlLayout} from '@spinach/next/ui/base/layout/userControl';


export const AccountLogin = async ({searchParams}: AccountLoginPageProps) => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(searchParams?.callbackUrl ?? '/');
  }

  return (
    <UserControlLayout>
      <AccountLoginClient error={searchParams?.error}/>
    </UserControlLayout>
  );
};
