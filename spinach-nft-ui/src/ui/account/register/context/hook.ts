import React from 'react';

import {AccountRegisterContext} from '@spinach/next/ui/account/register/context/const';


export const useAccountRegisterContext = () => {
  const context = React.useContext(AccountRegisterContext);

  if (context == null) {
    throw new Error('`useAccountRegisterContext()` must be used within a <AccountRegisterProvider/>');
  }

  return context;
};
