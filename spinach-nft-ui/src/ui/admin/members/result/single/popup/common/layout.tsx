import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {DataLookBackRequest} from '@spinach/next/types/userData/load';
import {useAdminLookBackInput} from '@spinach/next/ui/admin/members/result/common/lookback/hook';
import {AdminMemberDataLookBackInput} from '@spinach/next/ui/admin/members/result/common/lookback/main';
import {
  AdminLookBackLayoutRenderChildrenOpts,
  AdminLookBackRequestType,
} from '@spinach/next/ui/admin/members/result/single/popup/common/type';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/single/popup/type';


type Props = AdminMemberPopupProps & {
  requestType: AdminLookBackRequestType,
  header: React.ReactNode,
  initialState?: DataLookBackRequest,
  children: (opts: AdminLookBackLayoutRenderChildrenOpts) => React.ReactNode,
};

export const AdminLookBackResultLayout = ({member, requestType, header, initialState, children}: Props) => {
  const inputControl = useAdminLookBackInput({
    initialRequest: initialState,
    getDataLoadingOpts: (state) => ({
      type: requestType,
      opts: {
        userId: member.id,
        ...state,
      },
    }),
  });
  const {
    status,
    lazyLoaded,
    state,
  } = inputControl;

  return (
    <Flex className="gap-1.5 pr-2">
      <AdminMemberDataLookBackInput inputControl={inputControl}/>
      {header}
      {children({lazyLoaded, status, input: state.sent})}
    </Flex>
  );
};
