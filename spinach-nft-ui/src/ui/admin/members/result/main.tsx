import React from 'react';

import {translateApiError} from '@spinach/common/utils/translate/apiError';

import {Loading} from '@spinach/next/components/icons/loading';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {OverflowableTable} from '@spinach/next/components/shared/common/table/overflowable/main';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {ResponseOfAdminMemberList} from '@spinach/next/types/userData/lazyLoaded';
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

  const {act, status} = useUserDataActor({
    statusToast: true,
  });
  const [state, setState] = React.useState<AdminMembersResultState>({
    ...memberInfo,
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

  if (!act) {
    return <Loading/>;
  }

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
      <OverflowableTable
        data={membersToShow}
        header={<AdminMemberSingleHeader/>}
        getKey={(data) => data?.id}
        classOfRow="w-max gap-1 border-b-slate-400 p-1 not-last:border-b"
        renderRow={({data}) => (
          <AdminMemberSingleResult
            member={data}
            balanceSummary={state.balanceSummaryMap[data.id]}
            isAdmin={isAdmin}
            controlDisabled={!act || status === 'processing'}
            act={act}
            showPopup={(type) => setPopup({
              type,
              show: true,
              member: data,
            })}
            onUpdateError={(error) => setState(({error: _, ...original}) => ({
              ...original,
              error,
            }))}
            onUpdatedMember={(updated) => setState(({members, ...original}) => ({
              ...original,
              members: members.map((originalMember) => (
                originalMember.id === updated.id ? updated : originalMember
              )),
              error: null,
            }))}
          />
        )}
      />
    </Flex>
  );
};
