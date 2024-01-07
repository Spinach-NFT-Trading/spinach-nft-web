import React from 'react';

import {translateApiError} from '@spinach/common/utils/translate/apiError';
import AutoSizer from 'react-virtualized-auto-sizer';
import {FixedSizeList} from 'react-window';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {ResponseAdminMemberList} from '@spinach/next/types/userData/lazyLoaded';
import {adminMemberTableRowHeight} from '@spinach/next/ui/admin/members/result/const';
import {AdminMemberSingleResult} from '@spinach/next/ui/admin/members/result/single/main';
import {AdminMembersTable} from '@spinach/next/ui/admin/members/result/table';
import {AdminMembersResultState} from '@spinach/next/ui/admin/members/result/type';
import {AdminMembersFilterInput} from '@spinach/next/ui/admin/members/type';


type Props = {
  isAdmin: boolean,
  input: AdminMembersFilterInput,
  memberInfo: ResponseAdminMemberList,
};

export const AdminMembersResults = ({isAdmin, input, memberInfo}: Props) => {
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
  const {info, balanceSummaryMap} = memberInfo;

  const [state, setState] = React.useState<AdminMembersResultState>({
    members: info,
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
      <Flex className="h-[85vh]">
        <AutoSizer disableWidth>
          {({height}) => (
            <FixedSizeList
              height={height}
              itemCount={membersToShow.length + 1}
              itemSize={adminMemberTableRowHeight}
              itemData={[null, ...membersToShow]}
              itemKey={(idx, data) => data[idx]?.id ?? 'header'}
              width="100%"
              overscanCount={10}
              innerElementType={AdminMembersTable}
            >
              {({style, data, index}) => {
                // Extracting `width` out because it causes breaks on sticky row header if any
                const {width, ...styleToUse} = style;
                const member = data[index];

                if (!member) {
                  return null;
                }

                const {id} = member;

                return (
                  <AdminMemberSingleResult
                    key={id}
                    style={styleToUse}
                    isAdmin={isAdmin}
                    member={member}
                    balanceSummary={balanceSummaryMap[id]}
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
                  />
                );
              }}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Flex>
    </Flex>
  );
};
