import React from 'react';

import CheckBadgeIcon from '@heroicons/react/24/solid/CheckBadgeIcon';
import {VerificationStatus} from '@spinach/common/types/common/status';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {getVerificationStatusTextStyleMap, verificationStatusText} from '@spinach/next/const/verification';


type Props = {
  status: VerificationStatus,
  isActive?: boolean,
};

export const VerificationStatusUi = ({status, isActive}: Props) => {
  const textStyleMap = getVerificationStatusTextStyleMap(isActive);

  return (
    <Flex direction="row" noFullWidth className={textStyleMap[status]}>
      <CheckBadgeIcon className="h-6 w-6"/>
      <div className="whitespace-nowrap">
        {verificationStatusText[status]}
      </div>
    </Flex>
  );
};
