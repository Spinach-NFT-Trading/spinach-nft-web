import React from 'react';

import {AdminVerificationConfirmPopup} from '@spinach/next/components/shared/admin/verification/popup/confirm/main';
import {AdminVerificationImage} from '@spinach/next/components/shared/admin/verification/popup/image/main';
import {AdminVerificationPopupProps} from '@spinach/next/components/shared/admin/verification/popup/type';


export const AdminVerificationPopupContent = <TOtherData, >({
  onVerified,
  renderOtherInfo,
  getImageData,
  getConfirmPayload,
  ...props
}: AdminVerificationPopupProps<TOtherData>) => {
  const {state, setState} = props;

  if (!state.type) {
    return null;
  }

  if (state.type === 'image') {
    return (
      <AdminVerificationImage
        payload={state.payload}
        getImageData={(data) => getImageData(data)?.data}
      />
    );
  }

  if (state.type === 'confirm') {
    return (
      <AdminVerificationConfirmPopup
        onVerified={() => {
          onVerified(state.payload);
          setState((original) => ({
            ...original,
            show: false,
          }));
        }}
        onError={(error) => setState((original) => ({
          ...original,
          error,
        }))}
        getConfirmPayload={(pass) => getConfirmPayload(pass, state.payload)}
      />
    );
  }

  if (state.type === 'other') {
    return renderOtherInfo(state.payload);
  }

  throw new Error(`Unhandled popup content type: ${state.type satisfies never}`);
};
