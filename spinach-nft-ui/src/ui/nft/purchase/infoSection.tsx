import React from 'react';


import {Flex} from '@spinach/next/components/layout/flex/common';


type Props = {
  title: string,
  content: React.ReactNode,
};

export const NftPurchaseInfoSection = ({title, content}: Props) => {
  return (
    <Flex className="gap-2">
      <Flex className="text-slate-300">
        {title}
      </Flex>
      <Flex className="text-xl">
        {content}
      </Flex>
    </Flex>
  );
};
