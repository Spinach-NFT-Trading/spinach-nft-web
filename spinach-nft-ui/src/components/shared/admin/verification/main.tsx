import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {useAdminVerificationStateControl} from '@spinach/next/components/shared/admin/verification/hook';
import {AdminVerificationPopup} from '@spinach/next/components/shared/admin/verification/popup/main';
import {AdminVerificationPopupCommonProps} from '@spinach/next/components/shared/admin/verification/popup/type';
import {AdminVerificationRow} from '@spinach/next/components/shared/admin/verification/row';
import {AdminVerificationRowProps} from '@spinach/next/components/shared/admin/verification/type';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {WindowedTable} from '@spinach/next/components/shared/common/table/windowed/main';
import {WindowedTableProps} from '@spinach/next/components/shared/common/table/windowed/type';
import {useI18nApiErrorTranslator} from '@spinach/next/hooks/i18n/apiError/main';


type Props<TData> =
  Omit<WindowedTableProps<TData>, 'data' | 'renderRow'> &
  AdminVerificationPopupCommonProps<TData> &
  Omit<AdminVerificationRowProps<TData>, 'data'> & {
    data: TData[],
  };

export const AdminVerification = <TData, >({data, ...props}: Props<TData>) => {
  const stateControls = useAdminVerificationStateControl<TData>();
  const {state} = stateControls;

  const translateApiError = useI18nApiErrorTranslator();

  return (
    <Flex className="h-[70vh]">
      <AdminVerificationPopup
        {...stateControls}
        {...props}
      />
      {state.error && <Alert>{translateApiError(state.error)}</Alert>}
      <WindowedTable
        data={data}
        renderRow={(rowProps) => (
          <AdminVerificationRow
            {...rowProps}
            {...stateControls}
            {...props}
          />
        )}
        {...props}
      />
    </Flex>
  );
};
