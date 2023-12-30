import React from 'react';

import {UserInfo} from '@spinach/common/types/common/user';

import {Grid} from '@spinach/next/components/layout/grid';
import {AdminMemberSingleResult} from '@spinach/next/ui/admin/members/result/single';


type Props = {
  members: UserInfo[],
};

export const AdminMembersResults = ({members}: Props) => {
  return (
    <Grid className="grid-cols-1 gap-2 lg:grid-cols-2 2xl:grid-cols-3">
      {members.map((member) => <AdminMemberSingleResult key={member.id} member={member}/>)}
    </Grid>
  );
};
