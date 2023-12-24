import React from 'react';

import CheckBadgeIcon from '@heroicons/react/24/solid/CheckBadgeIcon';
import {VerificationStatus} from '@spinach/common/types/common/status';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {verificationStatusText, verificationStatusTextColor} from '@spinach/next/const/verification';


type Props = {
  status: VerificationStatus,
};

export const AccountBankVerified = ({status}: Props) => {
  return (
    <Flex direction="row" className={verificationStatusTextColor[status]}>
      <CheckBadgeIcon className="h-6 w-6"/>
      <div className="whitespace-nowrap">
        {verificationStatusText[status]}
      </div>
    </Flex>
  );
};
