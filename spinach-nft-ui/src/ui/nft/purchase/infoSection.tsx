import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex';


type Props = {
  title: string,
  content: React.ReactNode,
};

export const NftPurchaseInfoSection = ({title, content}: Props) => {
  return (
    <Flex direction="col" className="gap-2">
      <Flex direction="col" className="text-slate-300">
        {title}
      </Flex>
      <Flex direction="col" className="text-xl">
        {content}
      </Flex>
    </Flex>
  );
};
