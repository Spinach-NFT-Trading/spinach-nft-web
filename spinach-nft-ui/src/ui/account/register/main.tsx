import React from 'react';

import {redirect} from 'next/navigation';
import {getServerSession} from 'next-auth';

import {I18nProvider} from '@spinach/next/components/i18n/provider';
import {authOptions} from '@spinach/next/const/auth';
import {AccountRegisterClient} from '@spinach/next/ui/account/register/client';
import {AccountRegisterPageProps} from '@spinach/next/ui/account/register/type';
import {UserControlLayout} from '@spinach/next/ui/base/layout/userControl';


export const AccountRegister = async ({searchParams}: AccountRegisterPageProps) => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return (
    <UserControlLayout disableHomePageLink>
      <I18nProvider namespaces={[
        'UI.Component.AccountIdVerificationForm',
        'UI.InPage.Account.Register',
        'UI.Account',
        'UI.UserControl',
      ]}>
        <AccountRegisterClient {...searchParams}/>
      </I18nProvider>
    </UserControlLayout>
  );
};
