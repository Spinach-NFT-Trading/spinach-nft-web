'use client';
import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {HorizontalSplitter} from '@spinach/next/components/shared/common/splitter';
import {adminMembersMaxDisplayCount} from '@spinach/next/ui/admin/members/const';
import {AdminMembersSearchInput} from '@spinach/next/ui/admin/members/input/main';
import {AdminMembersResults} from '@spinach/next/ui/admin/members/result/main';
import {AdminMembersFilterInput, AdminMembersServerProps} from '@spinach/next/ui/admin/members/type';


export const AdminMembersClient = ({members}: AdminMembersServerProps) => {
  const [input, setInput] = React.useState<AdminMembersFilterInput>({
    idNumber: '',
    username: '',
    name: '',
    email: '',
    lineId: '',
    wallet: '',
    bankAccount: '',
  });
  const {
    idNumber,
    username,
    name,
    email,
    lineId,
    wallet,
    bankAccount,
  } = input;

  const membersToShow = React.useMemo(() => (
    members
      .filter((member) => {
        if (idNumber && !member.idNumber.includes(idNumber)) {
          return false;
        }

        if (username && !member.username.includes(username)) {
          return false;
        }

        if (name && !member.name.includes(name)) {
          return false;
        }

        if (email && !member.email.includes(email)) {
          return false;
        }

        if (lineId && !member.lineId.includes(lineId)) {
          return false;
        }

        if (wallet && !member.wallet.includes(wallet)) {
          return false;
        }

        return !(bankAccount && !member.bankDetails.some(({account}) => account.includes(bankAccount)));
      })
      .slice(0, adminMembersMaxDisplayCount)
  ), [members, input]);

  return (
    <Flex className="gap-1.5">
      <AdminMembersSearchInput input={input} setInput={setInput}/>
      <HorizontalSplitter/>
      <AdminMembersResults members={membersToShow}/>
    </Flex>
  );
};
