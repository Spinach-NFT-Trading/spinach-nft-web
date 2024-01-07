import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {adminMemberTableRowHeight} from '@spinach/next/ui/admin/members/result/const';
import {AdminMemberSingleHeader} from '@spinach/next/ui/admin/members/result/single/header';


export const AdminMembersTable = React.forwardRef<HTMLTableElement>(({
  children,
}: React.PropsWithChildren, ref) => (
  <Flex ref={ref} className="h-full">
    <AdminMemberSingleHeader style={{top: 0, left: 0, width: '100%', height: adminMemberTableRowHeight}}/>
    {children}
  </Flex>
));
