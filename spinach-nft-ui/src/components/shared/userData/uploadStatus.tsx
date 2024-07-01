import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import CloudArrowUpIcon from '@heroicons/react/24/outline/CloudArrowUpIcon';
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';

import {Flex} from '@spinach/next/components/layout/flex/common';


type Props = {
  success: boolean,
};

export const UserDataUploadStatus = ({success}: Props) => {
  return (
    <Flex direction="row" className="gap-1.5">
      <CloudArrowUpIcon className="size-8"/>
      <div className="size-8">
        {success ? <CheckCircleIcon/> : <ExclamationTriangleIcon/>}
      </div>
    </Flex>
  );
};
