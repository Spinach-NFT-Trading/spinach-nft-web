import React from 'react';

import {UserInfo} from '@spinach/common/types/common/user';
import {translateApiError} from '@spinach/common/utils/translate/apiError';
import AutoSizer from 'react-virtualized-auto-sizer';
import {FixedSizeList} from 'react-window';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {AdminMemberSingleResult} from '@spinach/next/ui/admin/members/result/single/main';
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
  const membersToShow = React.useMemo(() => state.members.filter((member) => {
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
  }), [state, input]);

  return (
    <Flex className="gap-1.5">
      {state.error && <Alert>{translateApiError(state.error)}</Alert>}
      <Flex className="info-highlight h-[85vh] p-2">
        <AutoSizer disableWidth>
          {({height}) => (
            <FixedSizeList
              height={height}
              itemCount={membersToShow.length}
              itemSize={43}
              itemData={membersToShow}
              itemKey={(idx, data) => data[idx].id}
              width="100%"
              overscanCount={10}
            >
              {({style, data, index}) => {
                const member = data[index];
                const {id} = member;

                // Extracting `width` out because it causes #187 (width not enough - sticky not in effect
                const {width, ...styleToUse} = style;

                return (
                  <div style={styleToUse}>
                    <AdminMemberSingleResult
                      key={id}
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
                              targetId: id,
                              agent,
                            },
                          },
                        });
                        const error = session?.user.jwtUpdateError;
                        if (!error) {
                          setState(({members}) => ({
                            members: members.map((memberOfOriginal) => ({
                              ...memberOfOriginal,
                              agent: memberOfOriginal.id === id ? agent : memberOfOriginal.agent,
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
                  </div>
                );
              }}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Flex>
    </Flex>
  );
};
