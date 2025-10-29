import React from 'react';

import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import {Session} from 'next-auth';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {formatToAbbreviation} from '@spinach/next/utils/number/format/regular';


type Props = {
  session: Session | null;
};

export const NavBarBalance = ({session}: Props) => {
  if (!session) {
    return <></>;
  }

  return (
    <Flex direction="row" center noFullWidth className="gap-0.5 whitespace-nowrap">
      <div className="size-6">
        <CurrencyDollarIcon/>
      </div>
      <div>
        {formatToAbbreviation({num: session.user.preloaded?.assets?.gold, decimals: 0})}
      </div>
    </Flex>
  );
};
