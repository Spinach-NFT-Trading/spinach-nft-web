import React from 'react';

import {AccountRegisterContextContent} from '@spinach/next/ui/account/register/context/type';


export const AccountRegisterContext = React.createContext<AccountRegisterContextContent | null>(null);
