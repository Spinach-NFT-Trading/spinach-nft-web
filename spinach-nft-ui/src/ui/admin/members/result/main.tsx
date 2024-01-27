import React from 'react';

import {ApiErrorCode} from '@spinach/common/types/api/error';
import {translateApiError} from '@spinach/common/utils/translate/apiError';

import {Loading} from '@spinach/next/components/icons/loading';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {OverflowableTable} from '@spinach/next/components/shared/common/table/overflowable/main';
import {ResponseOfAdminMemberList} from '@spinach/next/types/userData/lazyLoaded';
import {AdminLookBackInputControl} from '@spinach/next/ui/admin/members/result/common/lookback/type';
import {AdminMemberSingleHeader} from '@spinach/next/ui/admin/members/result/single/header';
import {AdminMemberSingleResult} from '@spinach/next/ui/admin/members/result/single/main';
import {AdminMemberPopup} from '@spinach/next/ui/admin/members/result/single/popup/main';
import {AdminMemberPopupState} from '@spinach/next/ui/admin/members/result/single/popup/type';
import {AdminMembersFilterInput} from '@spinach/next/ui/admin/members/type';


type Props = {
  isAdmin: boolean,
  input: AdminMembersFilterInput,
  memberInfo: ResponseOfAdminMemberList,
  lookBackInputControl: AdminLookBackInputControl,
};

export const AdminMembersResults = ({isAdmin, input, memberInfo, lookBackInputControl}: Props) => {
  const {
    key,
    value,
  } = input;

  const [error, setError] = React.useState<ApiErrorCode | null>(null);
  const [
    popup,
    setPopup,
  ] = React.useState<AdminMemberPopupState>({
    type: 'info',
    show: false,
    member: null,
  });

  const {act, status, setInputAndSend} = lookBackInputControl;

  const membersToShow = React.useMemo(() => memberInfo.members.filter((member) => (
    !value || member[key].includes(value)
  )), [memberInfo, input]);

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
      {error && <Alert>{translateApiError(error)}</Alert>}
      <OverflowableTable
        data={membersToShow}
        header={<AdminMemberSingleHeader/>}
        getKey={(data) => data?.id}
        classOfRow="w-max gap-1 border-b-slate-400 p-1 not-last:border-b"
        renderRow={({data}) => (
          <AdminMemberSingleResult
            member={data}
            balanceSummary={memberInfo.balanceSummaryMap[data.id]}
            isAdmin={isAdmin}
            controlDisabled={!act || status === 'processing'}
            act={act}
            showPopup={(type) => setPopup({
              type,
              show: true,
              member: data,
            })}
            onUpdateError={(error) => setError(error)}
            onUpdatedMember={() => setInputAndSend((original) => original)}
          />
        )}
      />
    </Flex>
  );
};
