import {AccountIdVerificationType} from '@spinach/common/types/api/profile/id';

import {FileRef} from '@spinach/next/types/input/fileRef';
import {ReactStateUpdaterFromOriginal} from '@spinach/next/types/react';


export type AccountIdVerificationState = {
  error: {[type in AccountIdVerificationType]: string | null},
};

export type AccountIdVerificationCommonProps = {
  state: AccountIdVerificationState,
  setState: ReactStateUpdaterFromOriginal<AccountIdVerificationState>,
  onSelected: (type: AccountIdVerificationType, fileRef: FileRef | null) => void,
};
