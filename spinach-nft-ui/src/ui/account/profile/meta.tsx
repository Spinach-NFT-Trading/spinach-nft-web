import React from 'react';

import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import EnvelopeIcon from '@heroicons/react/24/outline/EnvelopeIcon';
import IdentificationIcon from '@heroicons/react/24/outline/IdentificationIcon';
import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon';
import {Session} from 'next-auth';

import {Flex} from '@spinach/next/components/layout/flex';
import {formatFloat2} from '@spinach/next/utils/number';


type Props = {
  session: Session | null,
};

export const AccountMeta = ({session}: Props) => {
  if (!session) {
    return <></>;
  }

  const {username, name, email, preloaded} = session.user;

  return (
    <Flex direction="col" center className="gap-2">
      <Flex direction="col" center className="gap-2 md:flex-row">
        <Flex direction="row" center className="gap-2">
          <div className="relative h-6 w-6">
            <IdentificationIcon/>
          </div>
          <div>
            {username}
          </div>
        </Flex>
        <Flex direction="row" center className="gap-2">
          <div className="relative h-6 w-6">
            <UserCircleIcon/>
          </div>
          <div>
            {name ?? '-'}
          </div>
        </Flex>
        <Flex direction="row" center className="gap-2">
          <div className="relative h-6 w-6">
            <EnvelopeIcon/>
          </div>
          <div>
            {email ?? '-'}
          </div>
        </Flex>
      </Flex>
      <Flex direction="row" center className="gap-2 text-3xl text-amber-600 dark:text-amber-400">
        <div className="relative h-10 w-10">
          <CurrencyDollarIcon/>
        </div>
        <div>
          {formatFloat2(preloaded?.balance)}
        </div>
      </Flex>
    </Flex>
  );
};
