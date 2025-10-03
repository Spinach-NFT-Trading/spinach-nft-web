import React from 'react';

import {UserRegisterRequest} from '@spinach/common/types/api/auth/register';

import {NextPageProps} from '@spinach/next/types/next/page';
import {AccountVerificationFileRefMap} from '@spinach/next/ui/account/verificationUpload';


// Client-side input that uses FileReference for file handling
export type AccountRegisterInput = Omit<UserRegisterRequest, 'imageUploadIdMap'> & {
  step: 'info' | 'idVerification' | 'completed',
  imageFileRefs: AccountVerificationFileRefMap,
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
