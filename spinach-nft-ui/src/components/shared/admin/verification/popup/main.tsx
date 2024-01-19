import React from 'react';

import {Popup} from '@spinach/next/components/popup';
import {AdminVerificationPopupContent} from '@spinach/next/components/shared/admin/verification/popup/content';
import {AdminVerificationPopupProps} from '@spinach/next/components/shared/admin/verification/popup/type';


export const AdminVerificationPopup = <TOtherData, >(props: AdminVerificationPopupProps<TOtherData>) => {
  const {state, setState} = props;

  return (
    <Popup show={state.show} setShow={(show) => setState((original) => ({
      ...original,
      show,
    }))}>
      <AdminVerificationPopupContent {...props}/>
    </Popup>
  );
};
