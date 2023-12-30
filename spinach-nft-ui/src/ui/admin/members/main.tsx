import React from 'react';

import {AdminMembersClient} from '@spinach/next/ui/admin/members/client';
import {AdminOrAgentPageLayout} from '@spinach/next/ui/base/layout/adminOrAgent';


export const AdminMembers = async () => {
  return (
    <AdminOrAgentPageLayout>
      {(session) => <AdminMembersClient isAdmin={session.user.isAdmin}/>}
    </AdminOrAgentPageLayout>
  );
};
