import {AccountIdVerificationType} from '@spinach/common/types/api/profile/id';

import {FileRef} from '@spinach/next/types/input/fileRef';
import {ReactStateUpdaterFromOriginal} from '@spinach/next/types/react';
import {AccountVerificationFileRefMap} from '@spinach/next/ui/account/verificationUpload';


export type AccountIdVerificationState = {
  fileRefs: AccountVerificationFileRefMap,
  error: {[type in AccountIdVerificationType]: string | null},
};

export type AccountIdVerificationCommonProps = {
  state: AccountIdVerificationState,
  setState: ReactStateUpdaterFromOriginal<AccountIdVerificationState>,
  onSelected: (type: AccountIdVerificationType, fileRef: FileRef | null) => void,
};
