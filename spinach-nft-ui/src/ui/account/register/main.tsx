import React from 'react';

import {generateFileUploadGrant} from '@spinach/common/controller/actors/fileUpload';
import {redirect} from 'next/navigation';
import {getServerSession} from 'next-auth';

import {I18nProvider} from '@spinach/next/components/i18n/provider';
import {authOptions} from '@spinach/next/const/auth';
import {AccountRegisterClient} from '@spinach/next/ui/account/register/client';
import {AccountRegisterProvider} from '@spinach/next/ui/account/register/context/main';
import {AccountRegisterPageProps} from '@spinach/next/ui/account/register/type';
import {UserControlLayout} from '@spinach/next/ui/base/layout/userControl';


export const AccountRegister = async ({searchParams}: AccountRegisterPageProps) => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  const fileUploadGrantId = await generateFileUploadGrant();
  const resolvedSearchParams = await searchParams;

  return (
    <UserControlLayout disableHomePageLink>
      <I18nProvider>
        <AccountRegisterProvider agent={resolvedSearchParams?.agent ?? null} fileUploadGrantId={fileUploadGrantId}>
          <AccountRegisterClient/>
        </AccountRegisterProvider>
      </I18nProvider>
    </UserControlLayout>
  );
};
