import React from 'react';

import {translateApiError} from '@spinach/common/utils/translate/apiError';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {WindowedTable} from '@spinach/next/components/shared/common/table/windowed/main';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {ResponseOfAdminMemberList} from '@spinach/next/types/userData/lazyLoaded';
import {adminDataRowHeight} from '@spinach/next/ui/admin/const';
import {AdminMemberSingleHeader} from '@spinach/next/ui/admin/members/result/single/header';
import {AdminMemberSingleResult} from '@spinach/next/ui/admin/members/result/single/main';
import {AdminMemberPopup} from '@spinach/next/ui/admin/members/result/single/popup/main';
import {AdminMemberPopupState} from '@spinach/next/ui/admin/members/result/single/popup/type';
import {AdminMembersResultState} from '@spinach/next/ui/admin/members/result/type';
import {AdminMembersFilterInput} from '@spinach/next/ui/admin/members/type';


type Props = {
  isAdmin: boolean,
  input: AdminMembersFilterInput,
  memberInfo: ResponseOfAdminMemberList,
};

export const AdminMembersResults = ({isAdmin, input, memberInfo}: Props) => {
  const {
    key,
    value,
  } = input;
  const {info, balanceSummaryMap} = memberInfo;

  const {act, status} = useUserDataActor();
  const [state, setState] = React.useState<AdminMembersResultState>({
    members: info,
    error: null,
  });
  const [
    popup,
    setPopup,
  ] = React.useState<AdminMemberPopupState>({
    type: 'info',
    show: false,
    member: null,
  });
  const membersToShow = React.useMemo(() => state.members.filter((member) => (
    !value || member[key].includes(value)
  )), [state, input]);

  return (
    <Flex className="gap-2">
      <AdminMemberPopup
        state={popup}
        setShow={(show) => setPopup((original) => ({
          ...original,
          show,
        }))}
      />
      {state.error && <Alert>{translateApiError(state.error)}</Alert>}
      <Flex className="h-[70vh]">
        <WindowedTable
          data={membersToShow}
          itemHeight={adminDataRowHeight}
          header={<AdminMemberSingleHeader/>}
          getKey={(data) => data?.id}
          classOfRow="border-b-slate-400 p-2 not-last:border-b"
          renderRow={({data}) => (
            <AdminMemberSingleResult
              isAdmin={isAdmin}
              member={data}
              balanceSummary={balanceSummaryMap[data.id]}
              agentToggleDisabled={!act || status === 'processing'}
              showPopup={(type) => setPopup({
                type,
                show: true,
                member: data,
              })}
              onSetAgent={async (agent) => {
                if (!act) {
                  return;
                }

                const session = await act({
                  action: 'request',
                  options: {
                    type: 'admin.member.grant.agent',
                    data: {
                      targetId: data.id,
                      agent,
                    },
                  },
                });
                const error = session?.user.jwtUpdateError;
                if (!error) {
                  setState(({members}) => ({
                    members: members.map((memberOfOriginal) => ({
                      ...memberOfOriginal,
                      agent: memberOfOriginal.id === data.id ? agent : memberOfOriginal.agent,
                    })),
                    error: null,
                  }));
                  return;
                }

                setState(({error, ...original}) => ({
                  ...original,
                  error,
                }));
              }}
            />
          )}
        />
      </Flex>
    </Flex>
  );
};
