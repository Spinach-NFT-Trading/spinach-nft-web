import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex';


type Props = {
  icon: React.ReactNode,
  title: string,
  description: string,
};

export const HomeFooterIntroSection = ({icon, title, description}: Props) => {
  return (
    <Flex center>
      <div className="rounded-full border-2 border-gray-600 p-1.5">
        <div className="relative h-10 w-10 text-purple-600">
          {icon}
        </div>
      </div>
      <div className="text-lg font-semibold">
        {title}
      </div>
      <div className="text-gray-700">
        {description}
      </div>
    </Flex>
  );
};
