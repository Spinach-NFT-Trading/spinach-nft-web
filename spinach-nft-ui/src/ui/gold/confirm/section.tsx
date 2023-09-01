import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex';


type Props = {
  title: string,
  content: React.ReactNode,
};

export const GoldExchangeConfirmSection = ({title, content}: Props) => {
  return (
    <Flex direction="col" className="gap-2">
      <div>{title}</div>
      <div className="rounded-lg bg-slate-950/70 p-1">
        {content}
      </div>
    </Flex>
  );
};
