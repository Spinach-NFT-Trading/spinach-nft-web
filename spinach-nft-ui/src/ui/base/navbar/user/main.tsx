import React from 'react';

import {getServerSession} from 'next-auth';

import {I18nProvider} from '@spinach/next/components/i18n/provider';
import {authOptions} from '@spinach/next/const/auth';
import {UserControlClient} from '@spinach/next/ui/base/navbar/user/client';


export const UserControl = () => {
  const session = React.use(getServerSession(authOptions));

  return (
    <I18nProvider>
      <UserControlClient session={session}/>
    </I18nProvider>
  );
};
