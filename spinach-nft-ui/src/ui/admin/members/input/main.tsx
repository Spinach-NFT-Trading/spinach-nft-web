import React from 'react';

import {CollapsibleFull} from '@spinach/next/components/layout/collapsible/full';
import {useCollapsible} from '@spinach/next/components/layout/collapsible/hook';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {AdminMembersSearchInputField} from '@spinach/next/ui/admin/members/input/field';
import {AdminMembersSearchInputProps} from '@spinach/next/ui/admin/members/input/type';


export const AdminMembersSearchInput = (props: AdminMembersSearchInputProps) => {
  const collapsible = useCollapsible();

  return (
    <CollapsibleFull state={collapsible} button="篩選條件">
      <Flex className="gap-1.5 p-1.5">
        <AdminMembersSearchInputField
          dataKey="idNumber"
          title="身分證字號"
          {...props}
        />
        <AdminMembersSearchInputField
          dataKey="username"
          title="使用者 ID"
          {...props}
        />
        <AdminMembersSearchInputField
          dataKey="name"
          title="真實姓名"
          {...props}
        />
        <AdminMembersSearchInputField
          dataKey="email"
          title="Email"
          {...props}
        />
        <AdminMembersSearchInputField
          dataKey="lineId"
          title="LINE ID"
          {...props}
        />
        <AdminMembersSearchInputField
          dataKey="wallet"
          title="虛擬貨幣錢包"
          {...props}
        />
        <AdminMembersSearchInputField
          dataKey="bankAccount"
          title="銀行帳號"
          {...props}
        />
      </Flex>
    </CollapsibleFull>
  );
};
