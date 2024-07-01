import React from 'react';

import WrenchIcon from '@heroicons/react/24/solid/WrenchIcon';


import {Flex} from '@spinach/next/components/layout/flex/common';


export const Constructing = () => {
  return (
    <Flex center className="h-full">
      <div className="size-72">
        <WrenchIcon/>
      </div>
    </Flex>
  );
};
