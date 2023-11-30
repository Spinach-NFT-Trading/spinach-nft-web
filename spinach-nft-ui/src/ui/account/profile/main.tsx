import React from 'react';

import {getServerSession} from 'next-auth';

import {SignIn} from '@spinach/next/components/auth/signIn';
import {authOptions} from '@spinach/next/const/auth';
import {getBankDetailsOfUser} from '@spinach/next/controller/user/bankDetails';
import {getUserInfoById} from '@spinach/next/controller/user/info';
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
    bankDetails,
  ] = await Promise.all([
    getUserInfoById(session.user.id),
    getBankDetailsOfUser(session.user.id),
  ]);

  if (!userInfo) {
    return <SignIn/>;
  }

  const props: AccountProfileCommonProps = {
    userInfo,
    bankDetails,
  };

  return (
    <ProfileLayout>
      <AccountProfileClient {...props}/>
    </ProfileLayout>
  );
};
