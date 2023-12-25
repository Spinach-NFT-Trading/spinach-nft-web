import React from 'react';

import {AdminVerifyGoldTxnClient} from '@spinach/next/ui/admin/verify/goldTxn/client';
import {AdminRequiredPageLayout} from '@spinach/next/ui/base/layout/adminRequired';


export const AdminVerifyGoldTxn = () => {
  return (
    <AdminRequiredPageLayout>
      <AdminVerifyGoldTxnClient/>
    </AdminRequiredPageLayout>
  );
};
