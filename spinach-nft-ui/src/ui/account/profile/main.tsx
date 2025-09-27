import React from 'react';

import {getUserInfoById} from '@spinach/common/controller/user/info';
import {getServerSession} from 'next-auth';

import {SignIn} from '@spinach/next/components/auth/signIn';
import {I18nProvider} from '@spinach/next/components/i18n/provider';
import {authOptions} from '@spinach/next/const/auth';
import {AccountProfileClient} from '@spinach/next/ui/account/profile/client';
import {AccountProfileCommonProps} from '@spinach/next/ui/account/profile/type';
import {ProfileLayout} from '@spinach/next/ui/base/layout/profile/main';


export const AccountProfile = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <SignIn/>;
  }

  const [
    userInfo,
  ] = await Promise.all([
    getUserInfoById({userId: session.user.id, requiresElevated: false}),
  ]);

  if (!userInfo) {
    return <SignIn/>;
  }

  const props: AccountProfileCommonProps = {
    userInfo,
  };

  return (
    <ProfileLayout>
      <I18nProvider>
        <AccountProfileClient {...props}/>
      </I18nProvider>
    </ProfileLayout>
  );
};
