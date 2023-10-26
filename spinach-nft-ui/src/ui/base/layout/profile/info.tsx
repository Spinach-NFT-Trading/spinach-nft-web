import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {ProfileIcon} from '@spinach/next/components/shared/account/icon';
import {ProfileLayoutProps} from '@spinach/next/ui/base/layout/profile/type';
import {ProfileLayoutVerificationStatus} from '@spinach/next/ui/base/layout/profile/verified';


export const ProfileLayoutInfo = ({session}: ProfileLayoutProps) => {
  const {username} = session.user;

  return (
    <Flex direction="row" noFullWidth className="items-center gap-2">
      <ProfileIcon/>
      <Flex noFullWidth>
        <div className="text-3xl text-slate-200">
          {username}
        </div>
        <ProfileLayoutVerificationStatus/>
      </Flex>
    </Flex>
  );
};
