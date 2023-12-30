import React from 'react';

import {UserInfo} from '@spinach/common/types/common/user';
import {translateApiError} from '@spinach/common/utils/translate/apiError';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Grid} from '@spinach/next/components/layout/grid';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {adminMembersMaxDisplayCount} from '@spinach/next/ui/admin/members/const';
import {AdminMemberSingleResult} from '@spinach/next/ui/admin/members/result/single';
import {AdminMembersResultState} from '@spinach/next/ui/admin/members/result/type';
import {AdminMembersFilterInput} from '@spinach/next/ui/admin/members/type';


type Props = {
  isAdmin: boolean,
  input: AdminMembersFilterInput,
  membersOnLoad: UserInfo[],
};

export const AdminMembersResults = ({isAdmin, input, membersOnLoad}: Props) => {
  const {
    idNumber,
    username,
    name,
    email,
    lineId,
    wallet,
    bankAccount,
  } = input;
  const {act, status} = useUserDataActor();

  const [state, setState] = React.useState<AdminMembersResultState>({
    members: membersOnLoad,
    error: null,
  });
  const membersToShow = React.useMemo(() => (
    state.members
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
  ), [state, input]);

  return (
    <Flex className="gap-1.5">
      {state.error && <Alert>{translateApiError(state.error)}</Alert>}
      <Grid className="grid-cols-1 gap-2 lg:grid-cols-2 2xl:grid-cols-3">
        {membersToShow.map((member) => (
          <AdminMemberSingleResult
            key={member.id}
            isAdmin={isAdmin}
            member={member}
            onSetAgent={async (agent) => {
              if (!act) {
                return;
              }

              const session = await act({
                action: 'request',
                options: {
                  type: 'admin.member.grant.agent',
                  data: {
                    targetId: member.id,
                    agent,
                  },
                },
              });
              const error = session?.user.jwtUpdateError;
              if (!error) {
                setState(({members}) => ({
                  members: members.map((memberOfOriginal) => ({
                    ...memberOfOriginal,
                    agent: memberOfOriginal.id === member.id ? agent : memberOfOriginal.agent,
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
            agentToggleDisabled={!act || status === 'processing'}
          />
        ))}
      </Grid>
    </Flex>
  );
};
