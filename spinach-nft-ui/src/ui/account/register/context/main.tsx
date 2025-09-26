'use client';
import React from 'react';

import {AccountRegisterContext} from '@spinach/next/ui/account/register/context/const';


type Props = {
  agent: string | null,
  fileUploadGrantId: string,
};

export const AccountRegisterProvider = ({
  agent,
  fileUploadGrantId,
  children,
}: React.PropsWithChildren<Props>) => {
  return (
    <AccountRegisterContext.Provider value={{
      agent,
      fileUploadGrantId,
    }}>
      {children}
    </AccountRegisterContext.Provider>
  );
};
