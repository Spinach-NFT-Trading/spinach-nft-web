import React from 'react';

import clsx from 'clsx';

import {Flex} from '@spinach/next/components/layout/flex';


type Props = {
  title: string,
  content: React.ReactNode,
  noBackground?: boolean,
};

export const GoldExchangeConfirmSection = ({title, content, noBackground}: Props) => {
  return (
    <Flex className="gap-2">
      <div className="text-start">{title}</div>
      <div className={clsx('rounded-lg p-1 text-start', !noBackground && 'bg-slate-950/70')}>
        {content}
      </div>
    </Flex>
  );
};
