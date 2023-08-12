import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex';


export const Alert = ({children}: React.PropsWithChildren) => {
  return (
    <Flex direction="col" className="transform-smooth rounded-lg bg-rose-300 p-2 dark:bg-red-900">
      {children}
    </Flex>
  );
};
