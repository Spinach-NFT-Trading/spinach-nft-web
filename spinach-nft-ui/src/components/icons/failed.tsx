import React from 'react';

import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';

import {Flex} from '@spinach/next/components/layout/flex';


type Props = {
  text: string,
};

export const Failed = ({text}: Props) => {
  return (
    <Flex center className="h-screen gap-1">
      <div className="h-7 w-7">
        <ExclamationTriangleIcon/>
      </div>
      <div>
        {text}
      </div>
    </Flex>
  );
};
