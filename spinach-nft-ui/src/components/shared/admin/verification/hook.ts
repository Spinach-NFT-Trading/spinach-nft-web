import React from 'react';

import {
  AdminVerificationPopupState,
  AdminVerificationPopupControl,
} from '@spinach/next/components/shared/admin/verification/popup/type';


export const useAdminVerificationStateControl = <TData>(): AdminVerificationPopupControl<TData> => {
  const [
    state,
    setState,
  ] = React.useState<AdminVerificationPopupState<TData>>({
    show: false,
    type: null,
    payload: null,
    error: null,
  });

  return {state, setState};
};
