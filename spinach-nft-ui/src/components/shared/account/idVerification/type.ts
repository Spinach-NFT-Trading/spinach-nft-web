import React from 'react';

import {AccountIdVerificationType} from '@spinach/common/types/api/profile/id';
import {BinaryData} from '@spinach/common/types/common/binary';


export type AccountIdVerificationState = {
  error: {[type in AccountIdVerificationType]: string | null},
};

export type AccountIdVerificationCommonProps = {
  state: AccountIdVerificationState,
  setState: React.Dispatch<React.SetStateAction<AccountIdVerificationState>>,
  onSelected: (type: AccountIdVerificationType, data: BinaryData | null) => void,
};
