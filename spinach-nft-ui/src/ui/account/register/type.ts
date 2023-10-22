import React from 'react';

import {UserRegisterRequest} from '@spinach/common/types/api/auth/register';


export type AccountRegisterInput = UserRegisterRequest & {
  step: 'sms' | 'info' | 'idVerification' | 'completed',
  idImage: string | null,
};

export type AccountRegisterCommonProps = {
  show: boolean,
  input: AccountRegisterInput,
  setInput: React.Dispatch<React.SetStateAction<AccountRegisterInput>>,
  onComplete: () => void,
};
