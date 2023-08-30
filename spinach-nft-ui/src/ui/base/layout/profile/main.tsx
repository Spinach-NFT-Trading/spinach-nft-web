import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@spinach/next/const/auth';
import {LoginRequiredPageLayout} from '@spinach/next/ui/base/layout/loginRequired';
import {ProfileLayoutAuthenticated} from '@spinach/next/ui/base/layout/profile/authenticated';


export const ProfileLayout = ({children}: React.PropsWithChildren) => {
  const session = React.use(getServerSession(authOptions));

  return (
    <LoginRequiredPageLayout sessionOverride={session}>
      {session ?
        <ProfileLayoutAuthenticated session={session}>
          {children}
        </ProfileLayoutAuthenticated> :
        <></>}
    </LoginRequiredPageLayout>
  );
};
