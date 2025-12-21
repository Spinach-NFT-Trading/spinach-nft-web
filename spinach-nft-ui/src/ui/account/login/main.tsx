import React from 'react';

import {redirect} from 'next/navigation';
import {getServerSession} from 'next-auth';

import {I18nProvider} from '@spinach/next/components/i18n/provider';
import {authOptions} from '@spinach/next/const/auth';
import {AccountLoginClient} from '@spinach/next/ui/account/login/client';
import {AccountLoginPageProps} from '@spinach/next/ui/account/login/type';
import {UserControlLayout} from '@spinach/next/ui/base/layout/userControl';


export const AccountLogin = async ({searchParams}: AccountLoginPageProps) => {
  const resolved = await searchParams;
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(resolved?.callbackUrl ?? '/');
  }

  return (
    <UserControlLayout>
      <I18nProvider>
        <AccountLoginClient error={resolved?.error}/>
      </I18nProvider>
    </UserControlLayout>
  );
};
