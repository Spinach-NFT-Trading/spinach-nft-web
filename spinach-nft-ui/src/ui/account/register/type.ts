import React from 'react';

import {UserRegisterRequest} from '@spinach/common/types/api/auth/register';
import {AccountIdVerificationType} from '@spinach/common/types/api/profile/id';


export type AccountRegisterInput = UserRegisterRequest & {
  step: 'sms' | 'info' | 'idVerification' | 'completed',
  image: {[type in AccountIdVerificationType]: string | null},
};

export type AccountRegisterCommonProps = {
  show: boolean,
  input: AccountRegisterInput,
  setInput: React.Dispatch<React.SetStateAction<AccountRegisterInput>>,
  onComplete: () => void,
};
