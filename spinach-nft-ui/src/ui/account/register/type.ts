import React from 'react';

import {UserRegisterRequest} from '@spinach/common/types/api/auth/register';
import {ApiErrorCode} from '@spinach/common/types/api/error';

import {NextPageProps} from '@spinach/next/types/next/page';


export type AccountRegisterInput = UserRegisterRequest & {
  step: 'info' | 'idVerification' | 'completed',
};

export type AccountRegisterCommonProps = {
  show: boolean,
  input: AccountRegisterInput,
  setInput: React.Dispatch<React.SetStateAction<AccountRegisterInput>>,
  onComplete: () => void,
};

export type AccountRegisterSearchParams = {
  agent?: string,
};

export type AccountRegisterPageProps = NextPageProps<{}, AccountRegisterSearchParams>;

export type AccountRegisterFormProps = AccountRegisterSearchParams & {
  setError: (error: ApiErrorCode | null) => void,
};
