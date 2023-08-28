import React from 'react';

import {getServerSession} from 'next-auth';

import {HorizontalSplitter} from '@spinach/next/components/shared/common/splitter';
import {authOptions} from '@spinach/next/const/auth';
import {AccountMeta} from '@spinach/next/ui/account/profile/meta';
import {AccountNftPosition} from '@spinach/next/ui/account/profile/position';
import {LoginRequiredPageLayout} from '@spinach/next/ui/base/layout/loginRequired';


export const AccountProfile = () => {
  const session = React.use(getServerSession(authOptions));

  return (
    <LoginRequiredPageLayout>
      <AccountMeta session={session}/>
      <HorizontalSplitter className="w-full"/>
      <AccountNftPosition/>
    </LoginRequiredPageLayout>
  );
};
