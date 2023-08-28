import React from 'react';

import ArrowLeftCircleIcon from '@heroicons/react/24/outline/ArrowLeftCircleIcon';
import ArrowRightCircleIcon from '@heroicons/react/24/outline/ArrowRightCircleIcon';
import clsx from 'clsx';
import {signIn, signOut} from 'next-auth/react';

import {Flex} from '@spinach/next/components/layout/flex';
import {UserControlCommonProps} from '@spinach/next/ui/base/navbar/user/type';


export const UserAuthButton = ({session}: UserControlCommonProps) => {
  if (!session) {
    return (
      <button className="nav-button-text group" onClick={() => signIn()}>
        <Flex direction="row" className="gap-1">
          <div className={clsx(
            'transform-smooth relative h-5 w-5',
            'text-green-700 group-hover:text-green-400 dark:text-green-400 dark:group-hover:text-green-700',
          )}>
            <ArrowLeftCircleIcon/>
          </div>
          <div>登入</div>
        </Flex>
      </button>
    );
  }

  return (
    <button className="nav-button-text group" onClick={() => signOut()}>
      <Flex direction="row" className="gap-1">
        <div className={clsx(
          'transform-smooth relative h-5 w-5',
          'text-red-700 group-hover:text-red-400 dark:text-red-400 dark:group-hover:text-red-700',
        )}>
          <ArrowRightCircleIcon/>
        </div>
        <div>登出</div>
      </Flex>
    </button>
  );
};
