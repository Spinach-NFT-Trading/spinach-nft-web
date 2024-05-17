import React from 'react';

import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import {clsx} from 'clsx';


import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexLink} from '@spinach/next/components/layout/flex/link';


export const ProfileLayoutControls = () => {
  return (
    <Flex direction="row" className="justify-center gap-2 md:justify-end">
      <FlexLink href="/gold/exchange" className={clsx(
        'button-base button-text-hover button-bg gap-1 p-1 px-1.5 text-base hover:bg-amber-400',
      )}>
        <div className="relative size-6">
          <PlusCircleIcon/>
        </div>
        <div>
          購買 GOLD
        </div>
      </FlexLink>
    </Flex>
  );
};
