'use client';
import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {UserAuthButton} from '@spinach/next/ui/base/navbar/user/auth';
import {UserProfileButton} from '@spinach/next/ui/base/navbar/user/profile';
import {UserControlCommonProps} from '@spinach/next/ui/base/navbar/user/type';


export const UserControlClient = (props: UserControlCommonProps) => {
  return (
    <Flex noFullWidth direction="row" className="gap-2">
      <UserProfileButton {...props}/>
      <UserAuthButton {...props}/>
    </Flex>
  );
};
