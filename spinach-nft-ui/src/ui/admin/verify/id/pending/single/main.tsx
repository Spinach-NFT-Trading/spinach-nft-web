import React from 'react';

import {UserInfo} from '@spinach/common/types/common/user';

import {CollapsibleFull} from '@spinach/next/components/layout/collapsible/full';
import {useCollapsible} from '@spinach/next/components/layout/collapsible/hook';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {AdminPendingVerificationContent} from '@spinach/next/ui/admin/verify/id/pending/single/content';


type Props = {
  user: UserInfo,
};

export const AdminPendingVerificationSingle = ({user}: Props) => {
  const {name, username} = user;

  const collapsible = useCollapsible();

  return (
    <CollapsibleFull state={collapsible} button={
      <Flex center className="py-2">
        {name} (@{username})
      </Flex>
    }>
      <AdminPendingVerificationContent user={user}/>
    </CollapsibleFull>
  );
};
