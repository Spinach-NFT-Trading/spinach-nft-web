import React from 'react';

import {AdminPageClient} from '@spinach/next/ui/admin/client';
import {AdminOrAgentPageLayout} from '@spinach/next/ui/base/layout/adminOrAgent';


export const AdminPage = () => {
  return (
    <AdminOrAgentPageLayout>
      {({user}) => <AdminPageClient isAdmin={user.isAdmin}/>}
    </AdminOrAgentPageLayout>
  );
};
