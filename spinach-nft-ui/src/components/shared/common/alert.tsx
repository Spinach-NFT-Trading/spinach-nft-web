import React from 'react';


import {Flex} from '@spinach/next/components/layout/flex/common';


export const Alert = ({children}: React.PropsWithChildren) => {
  return (
    <Flex className="transform-smooth rounded-lg bg-red-900 p-2">
      {children}
    </Flex>
  );
};
