import React from 'react';

import {I18nProvider} from '@spinach/next/components/i18n/provider';
import {AdminPageClient} from '@spinach/next/ui/admin/client';
import {AdminOrAgentPageLayout} from '@spinach/next/ui/base/layout/adminOrAgent';


export const AdminPage = async () => {
  return (
    <AdminOrAgentPageLayout>
      {({user}) => (
        <I18nProvider namespaces={[
          'UI.InPage.Admin',
          'UI.Account',
          'UI.VerificationStatus',
          'UI.User.Balance.HistoryType',
        ]}>
          <AdminPageClient user={user}/>
        </I18nProvider>
      )}
    </AdminOrAgentPageLayout>
  );
};
