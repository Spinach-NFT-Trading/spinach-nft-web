import React from 'react';

import CheckBadgeIcon from '@heroicons/react/24/solid/CheckBadgeIcon';
import clsx from 'clsx';

import {Flex} from '@spinach/next/components/layout/flex';


type Props = {
  verified: boolean | undefined,
};

export const ProfileLayoutVerificationStatus = ({verified}: Props) => {
  return (
    <Flex direction="row" className={clsx(!verified && 'text-slate-500')}>
      <div className={clsx('relative h-6 w-6', verified && 'text-blue-500')}>
        <CheckBadgeIcon/>
      </div>
      <div className="whitespace-nowrap">
        {verified ? '已簡訊認證' : '未簡訊認證'}
      </div>
    </Flex>
  );
};
