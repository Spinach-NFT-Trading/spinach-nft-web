import React from 'react';

import {AdminVerifyBankClient} from '@spinach/next/ui/admin/verify/bank/client';
import {AdminRequiredPageLayout} from '@spinach/next/ui/base/layout/adminRequired';


export const AdminVerifyBank = () => {
  return (
    <AdminRequiredPageLayout>
      <AdminVerifyBankClient/>
    </AdminRequiredPageLayout>
  );
};
