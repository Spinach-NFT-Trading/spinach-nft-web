import React from 'react';

import {UserInfo} from '@spinach/common/types/common/user';

import {CollapsibleFull} from '@spinach/next/components/layout/collapsible/full';
import {useCollapsible} from '@spinach/next/components/layout/collapsible/hook';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {Grid} from '@spinach/next/components/layout/grid';
import {VerificationStatusUi} from '@spinach/next/components/shared/common/verified';
import {AdminMemberDataCell} from '@spinach/next/ui/admin/members/result/cell';


type Props = {
  isAdmin: boolean,
  member: UserInfo,
  onSetAgent: (enable: boolean) => void,
  agentToggleDisabled: boolean,
};

export const AdminMemberSingleResult = ({isAdmin, member, onSetAgent, agentToggleDisabled}: Props) => {
  const {
    id,
    status,
    idNumber,
    username,
    name,
    birthday,
    email,
    lineId,
    recruitedBy,
    bankDetails,
    wallet,
    agent,
  } = member;
  const collapsible = useCollapsible();

  return (
    <CollapsibleFull key={id} state={collapsible} button={
      <Flex center className="items-center gap-1.5 p-1 md:flex-row">
        <Flex direction="row" center noFullWidth className="gap-1.5">
          {agent && <div className="info-highlight px-1.5 py-1 text-sm">代理</div>}
          <VerificationStatusUi status={status}/>
        </Flex>
        <div className="text-lg">{name} ({username})</div>
      </Flex>
    }>
      <Flex className="gap-1.5 p-1">
        <AdminMemberDataCell title="使用者 ID" info={id}/>
        <AdminMemberDataCell title="使用者 ID" info={username}/>
        <AdminMemberDataCell title="真實姓名" info={name}/>
        <AdminMemberDataCell title="身分證字號" info={idNumber}/>
        <AdminMemberDataCell title="生日" info={birthday}/>
        <AdminMemberDataCell title="Email" info={email}/>
        <AdminMemberDataCell title="LINE ID" info={lineId}/>
        <AdminMemberDataCell title="虛擬貨幣錢包" info={wallet}/>
        {recruitedBy && <AdminMemberDataCell title="代理上線 ID" info={recruitedBy}/>}
        <Grid className="info-section grid-cols-1 gap-2 lg:grid-cols-2 2xl:grid-cols-3">
          {bankDetails.length ?
            bankDetails.map(({status, account, code, uuid}) => (
              <Flex key={uuid} className="gap-1">
                <VerificationStatusUi status={status}/>
                <AdminMemberDataCell center={false} title="銀行代碼" info={code}/>
                <AdminMemberDataCell center={false} title="銀行帳號" info={account}/>
              </Flex>
            )) :
            '無相關銀行帳號'}
        </Grid>
        {
          isAdmin &&
          <button
            className="button-clickable-bg p-1"
            onClick={() => onSetAgent(!agent)}
            disabled={agentToggleDisabled}
          >
            {agent ? '拔除代理' : '授予代理'}
          </button>
        }
      </Flex>
    </CollapsibleFull>
  );
};
