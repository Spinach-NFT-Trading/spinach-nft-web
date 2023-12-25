import React from 'react';

import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import IdentificationIcon from '@heroicons/react/24/outline/IdentificationIcon';

import {Grid} from '@spinach/next/components/layout/grid';
import {TileLink} from '@spinach/next/components/shared/link';
import {AdminRequiredPageLayout} from '@spinach/next/ui/base/layout/adminRequired';


export const AdminIndex = () => {
  return (
    <AdminRequiredPageLayout>
      <Grid className="gap-2 text-3xl lg:grid-cols-2">
        <TileLink link="/admin/verify/id" text="驗證身分" icon={<IdentificationIcon/>}/>
        <TileLink link="/admin/verify/bank" text="驗證銀行帳號" icon={<IdentificationIcon/>}/>
        <TileLink link="/admin/verify/gold" text="驗證轉帳紀錄" icon={<CurrencyDollarIcon/>}/>
      </Grid>
    </AdminRequiredPageLayout>
  );
};
