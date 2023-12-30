import React from 'react';

import {getServerSession} from 'next-auth';

import {SignIn} from '@spinach/next/components/auth/signIn';
import {authOptions} from '@spinach/next/const/auth';
import {getAccountMembers} from '@spinach/next/controller/user/members';
import {AdminMembersClient} from '@spinach/next/ui/admin/members/client';
import {AdminMembersServerProps} from '@spinach/next/ui/admin/members/type';
import {AdminOrAgentPageLayout} from '@spinach/next/ui/base/layout/adminOrAgent';


export const AdminMembers = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <SignIn/>;
  }

  const [
    members,
  ] = await Promise.all([
    getAccountMembers({executorUserId: session.user.id}),
  ]);

  const props: AdminMembersServerProps = {
    members,
  };

  return (
    <AdminOrAgentPageLayout>
      <AdminMembersClient {...props}/>
    </AdminOrAgentPageLayout>
  );
};
