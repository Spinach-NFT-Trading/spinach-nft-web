import React from 'react';

import {AdminPageClient} from '@spinach/next/ui/admin/client';
import {AdminRequiredPageLayout} from '@spinach/next/ui/base/layout/adminRequired';


export const AdminPage = () => {
  return (
    <AdminRequiredPageLayout>
      {({user}) => <AdminPageClient isAdmin={user.isAdmin}/>}
    </AdminRequiredPageLayout>
  );
};
