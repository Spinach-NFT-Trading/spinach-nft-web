import React from 'react';

import {Loading} from '@spinach/next/components/icons/loading';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {OverflowableTable} from '@spinach/next/components/shared/common/table/overflowable/main';
import {ResponseOfAdminAgentList} from '@spinach/next/types/userData/lazyLoaded';
import {AdminAgentHeader} from '@spinach/next/ui/admin/agents/result/header';
import {AdminAgentRow} from '@spinach/next/ui/admin/agents/result/row';
import {AdminAgentRowCommonProps} from '@spinach/next/ui/admin/agents/result/type';
import {AdminMembersFilterInput} from '@spinach/next/ui/admin/members/type';


type Props = AdminAgentRowCommonProps & {
  input: AdminMembersFilterInput,
  data: ResponseOfAdminAgentList,
  onAgentSelected: (agentId: string | null) => void,
};

export const AdminAgentsResults = ({
  input,
  data,
  onAgentSelected,
  ...props
}: Props) => {
  const {actor, lookBackInputControl} = props;
  const {key, value} = input;
  const {agentMemberList, agentInfo, balanceActivityMap} = data;
  const {act} = lookBackInputControl;

  const infoListToShow = React.useMemo(() => agentMemberList.filter(({agentId}) => {
    if (!value) {
      return true;
    }

    if (!agentId) {
      return false;
    }

    const agentUserInfo = agentInfo[agentId];
    if (!agentUserInfo) {
      return false;
    }

    return agentUserInfo[key]?.includes(value);
  }), [data, input]);

  if (!act) {
    return <Loading/>;
  }

  return (
    <Flex className="gap-2">
      <OverflowableTable
        data={infoListToShow}
        header={<AdminAgentHeader permissionFlags={actor}/>}
        getKey={(data) => data?.agentId}
        classOfRow="w-max gap-1 border-b-slate-400 p-1 not-last:border-b"
        renderRow={({data}) => {
          const {agentId} = data;
          if (!agentId) {
            return (
              <AdminAgentRow
                data={data}
                agent={null}
                balanceActivityMap={balanceActivityMap}
                onMemberListClick={() => onAgentSelected(agentId)}
                {...props}
              />
            );
          }

          const agent = agentInfo[agentId];
          if (!agent) {
            return null;
          }

          return (
            <AdminAgentRow
              data={data}
              agent={agent}
              balanceActivityMap={balanceActivityMap}
              onMemberListClick={() => onAgentSelected(agentId)}
              {...props}
            />
          );
        }}
      />
    </Flex>
  );
};
