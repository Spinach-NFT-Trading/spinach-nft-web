import React from 'react';

import CheckBadgeIcon from '@heroicons/react/24/solid/CheckBadgeIcon';
import clsx from 'clsx';


import {Flex} from '@spinach/next/components/layout/flex/common';


type Props = {
  verified?: boolean,
};

export const ProfileLayoutVerificationStatus = ({verified}: Props) => {
  return (
    <Flex direction="row" className={clsx(!verified && 'text-slate-500')}>
      <CheckBadgeIcon className={clsx('h-6 w-6', verified && 'text-blue-500')}/>
      <div className="whitespace-nowrap">
        {verified ? '已認證' : '未認證'}
      </div>
    </Flex>
  );
};
