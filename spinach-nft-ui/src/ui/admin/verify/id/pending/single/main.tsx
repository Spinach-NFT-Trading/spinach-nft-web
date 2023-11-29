import React from 'react';

import {CollapsibleFull} from '@spinach/next/components/layout/collapsible/full';
import {useCollapsible} from '@spinach/next/components/layout/collapsible/hook';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {AdminPendingVerificationContent} from '@spinach/next/ui/admin/verify/id/pending/single/content';
import {AdminPendingVerificationProps} from '@spinach/next/ui/admin/verify/id/pending/single/type';
import {formatUserName} from '@spinach/next/utils/data/user';


export const AdminPendingVerificationSingle = (props: AdminPendingVerificationProps) => {
  const {user} = props;

  const collapsible = useCollapsible();

  return (
    <CollapsibleFull state={collapsible} button={
      <Flex center className="py-2">
        {formatUserName(user)}
      </Flex>
    }>
      <AdminPendingVerificationContent {...props}/>
    </CollapsibleFull>
  );
};
