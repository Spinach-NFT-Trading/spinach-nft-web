import React from 'react';

import {AuthProvider} from '@/contexts/auth';
import {AccountLoginClient} from '@/ui/account/login/client';
import {PageLayout} from '@/ui/base/layout';


export const AccountLogin = () => {
  return (
    <PageLayout>
      <AuthProvider>
        <AccountLoginClient/>
      </AuthProvider>
    </PageLayout>
  );
};
