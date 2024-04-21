import React from 'react';

import {getGlobalConfig} from '@spinach/common/controller/actors/global';

import {AdminPageClient} from '@spinach/next/ui/admin/client';
import {AdminOrAgentPageLayout} from '@spinach/next/ui/base/layout/adminOrAgent';


export const AdminPage = async () => {
  const globalConfig = await getGlobalConfig();

  return (
    <AdminOrAgentPageLayout>
      {({user}) => <AdminPageClient user={user} globalConfig={globalConfig}/>}
    </AdminOrAgentPageLayout>
  );
};
