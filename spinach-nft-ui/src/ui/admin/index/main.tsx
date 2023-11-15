import React from 'react';

import IdentificationIcon from '@heroicons/react/24/outline/IdentificationIcon';

import {Grid} from '@spinach/next/components/layout/grid';
import {TileLink} from '@spinach/next/components/shared/link';
import {AdminRequiredPageLayout} from '@spinach/next/ui/base/layout/adminRequired';


export const AdminIndex = () => {
  return (
    <AdminRequiredPageLayout>
      <Grid className="gap-2 text-3xl lg:grid-cols-2">
        <TileLink link="/admin/verify/id" text="驗證身分" icon={<IdentificationIcon/>}/>
      </Grid>
    </AdminRequiredPageLayout>
  );
};
