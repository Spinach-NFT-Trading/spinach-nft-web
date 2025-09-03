import React from 'react';

import {ApiErrorCode} from '@spinach/common/types/api/error';

import {Loading} from '@spinach/next/components/icons/loading';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {OverflowableTable} from '@spinach/next/components/shared/common/table/overflowable/main';
import {useI18nApiErrorTranslator} from '@spinach/next/hooks/i18n/apiError/main';
import {CommonUserData} from '@spinach/next/types/auth';
import {ResponseOfAdminMemberList} from '@spinach/next/types/userData/lazyLoaded';
import {AdminLookBackInputControl} from '@spinach/next/ui/admin/common/lookback/type';
import {AdminMemberSingleHeader} from '@spinach/next/ui/admin/members/result/header';
import {AdminMemberPopup} from '@spinach/next/ui/admin/members/result/popup/main';
import {AdminMemberPopupState} from '@spinach/next/ui/admin/members/result/popup/type';
import {AdminMemberRow} from '@spinach/next/ui/admin/members/result/row';
import {AdminMembersFilterInput} from '@spinach/next/ui/admin/members/type';


type Props = {
  user: CommonUserData,
  input: AdminMembersFilterInput,
  memberInfo: ResponseOfAdminMemberList,
  lookBackInputControl: AdminLookBackInputControl,
};

export const AdminMembersResults = ({user, input, memberInfo, lookBackInputControl}: Props) => {
  const {
    key,
    value,
  } = input;
  const {members} = memberInfo;
  const {act, status, setInputAndSend} = lookBackInputControl;

  const [error, setError] = React.useState<ApiErrorCode | null>(null);
  const [
    popup,
    setPopup,
  ] = React.useState<AdminMemberPopupState>({
    type: 'info',
    show: false,
    member: null,
  });

  const translateApiError = useI18nApiErrorTranslator();

  const membersToShow = React.useMemo(() => members.filter((member) => (
    !value || member[key]?.includes(value)
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
        header={<AdminMemberSingleHeader permissionFlags={user}/>}
        getKey={(data) => data?.id}
        classOfRow="w-max gap-1 border-b-slate-400 p-1 not-last:border-b"
        renderRow={({data}) => (
          <AdminMemberRow
            member={data}
            balanceActivity={memberInfo.balanceActivityMap[data.id]}
            actor={user}
            controlDisabled={!act || status === 'processing'}
            act={act}
            showPopup={(type) => setPopup({
              type,
              show: true,
              member: data,
            })}
            onUpdateError={(error) => setError(error)}
            onUpdatedMember={() => {
              setInputAndSend((original) => original);
              setError(null);
            }}
          />
        )}
      />
    </Flex>
  );
};
