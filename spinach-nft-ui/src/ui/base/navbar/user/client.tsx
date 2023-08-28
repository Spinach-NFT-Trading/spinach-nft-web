'use client';
import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex';
import {UserAuthButton} from '@spinach/next/ui/base/navbar/user/auth';
import {UserProfileButton} from '@spinach/next/ui/base/navbar/user/profile';
import {UserControlCommonProps} from '@spinach/next/ui/base/navbar/user/type';


export const UserControlClient = (props: UserControlCommonProps) => {
  return (
    <Flex noFullWidth direction="row" className="gap-1.5">
      <UserProfileButton {...props}/>
      <UserAuthButton {...props}/>
    </Flex>
  );
};
