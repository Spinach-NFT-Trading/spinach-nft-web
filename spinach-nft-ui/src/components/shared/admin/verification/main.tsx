import React from 'react';

import {CollapsibleFull} from '@spinach/next/components/layout/collapsible/full';
import {useCollapsible} from '@spinach/next/components/layout/collapsible/hook';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {AdminVerificationCollapsibleContent} from '@spinach/next/components/shared/admin/verification/content';
import {AdminVerificationCollapsibleProps} from '@spinach/next/components/shared/admin/verification/type';


export const AdminVerificationCollapsible = <TData, >(props: AdminVerificationCollapsibleProps<TData>) => {
  const {getTitle, data} = props;

  const collapsible = useCollapsible();

  return (
    <CollapsibleFull state={collapsible} button={
      <Flex center className="py-2">
        {getTitle(data)}
      </Flex>
    }>
      <AdminVerificationCollapsibleContent {...props}/>
    </CollapsibleFull>
  );
};
