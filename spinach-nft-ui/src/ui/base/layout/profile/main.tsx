import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@spinach/next/const/auth';
import {LoginRequiredPageLayout} from '@spinach/next/ui/base/layout/loginRequired';
import {ProfileLayoutAuthenticated} from '@spinach/next/ui/base/layout/profile/authenticated';
import {PageLayoutProps} from '@spinach/next/ui/base/layout/type';


export const ProfileLayout = ({children, ...props}: React.PropsWithChildren<PageLayoutProps>) => {
  const session = React.use(getServerSession(authOptions));

  return (
    <LoginRequiredPageLayout sessionOverride={session} {...props}>
      {session ?
        <ProfileLayoutAuthenticated session={session}>
          {children}
        </ProfileLayoutAuthenticated> :
        <></>}
    </LoginRequiredPageLayout>
  );
};
