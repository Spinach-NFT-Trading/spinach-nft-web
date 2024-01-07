import React from 'react';

import {UserInfo} from '@spinach/common/types/common/user';

import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {UserBalanceSummary} from '@spinach/next/types/mongo/balance';
import {AdminMemberSingleResult} from '@spinach/next/ui/admin/members/result/single/main';
import {AdminMembersResultState} from '@spinach/next/ui/admin/members/result/type';


type Props = {
  style: React.CSSProperties,
  isAdmin: boolean,
  info: UserInfo,
  balanceSummary: UserBalanceSummary | undefined,
  setResultState: React.Dispatch<React.SetStateAction<AdminMembersResultState>>,
};

export const AdminMemberTableRow = ({
  style,
  isAdmin,
  info,
  balanceSummary,
  setResultState,
}: Props) => {
  const {act, status} = useUserDataActor();

  return (
    <AdminMemberSingleResult
      style={style}
      isAdmin={isAdmin}
      member={info}
      balanceSummary={balanceSummary}
      agentToggleDisabled={!act || status === 'processing'}
      onSetAgent={async (agent) => {
        if (!act) {
          return;
        }

        const session = await act({
          action: 'request',
          options: {
            type: 'admin.member.grant.agent',
            data: {
              targetId: info.id,
              agent,
            },
          },
        });
        const error = session?.user.jwtUpdateError;
        if (!error) {
          setResultState(({members}) => ({
            members: members.map((memberOfOriginal) => ({
              ...memberOfOriginal,
              agent: memberOfOriginal.id === info.id ? agent : memberOfOriginal.agent,
            })),
            error: null,
          }));
          return;
        }

        setResultState(({error, ...original}) => ({
          ...original,
          error,
        }));
      }}
    />
  );
};
