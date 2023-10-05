import React from 'react';

import EnvelopeIcon from '@heroicons/react/24/outline/EnvelopeIcon';
import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import clsx from 'clsx';
import Link from 'next/link';

import {Flex} from '@spinach/next/components/layout/flex';


export const ProfileLayoutControls = () => {
  return (
    <Flex direction="row" className="justify-center gap-2 md:justify-end">
      <Link href="/gold/exchange" className={clsx(
        'button-base button-text-hover button-bg p-1 px-1.5 text-base hover:bg-amber-400',
      )}>
        <Flex direction="row" className="gap-1">
          <div className="relative h-6 w-6">
            <PlusCircleIcon/>
          </div>
          <div>
            購買 GOLD
          </div>
        </Flex>
      </Link>
      <Link href="/account/verify/sms" className={clsx(
        'button-base button-text-hover button-bg p-1 px-1.5 text-base hover:bg-slate-200',
      )}>
        <Flex direction="row" className="gap-1">
          <div className="relative h-6 w-6">
            <EnvelopeIcon/>
          </div>
          <div>
            簡訊驗證
          </div>
        </Flex>
      </Link>
    </Flex>
  );
};
