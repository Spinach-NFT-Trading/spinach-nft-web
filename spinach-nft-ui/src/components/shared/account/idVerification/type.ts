import {AccountIdVerificationType} from '@spinach/common/types/api/profile/id';
import {BinaryData} from '@spinach/common/types/common/binary';

import {ReactStateUpdaterFromOriginal} from '@spinach/next/types/react';


export type AccountIdVerificationState = {
  error: {[type in AccountIdVerificationType]: string | null},
};

export type AccountIdVerificationCommonProps = {
  state: AccountIdVerificationState,
  setState: ReactStateUpdaterFromOriginal<AccountIdVerificationState>,
  onSelected: (type: AccountIdVerificationType, data: BinaryData | null) => void,
};
