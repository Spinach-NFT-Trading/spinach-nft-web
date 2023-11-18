import React from 'react';

import {AdminVerifyIdClient} from '@spinach/next/ui/admin/verify/id/client';
import {AdminRequiredPageLayout} from '@spinach/next/ui/base/layout/adminRequired';


export const AdminVerifyId = () => {
  return (
    <AdminRequiredPageLayout>
      <AdminVerifyIdClient/>
    </AdminRequiredPageLayout>
  );
};
