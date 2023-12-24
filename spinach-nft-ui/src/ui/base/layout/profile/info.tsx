import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {ProfileIcon} from '@spinach/next/components/shared/account/icon';
import {VerificationStatusUi} from '@spinach/next/components/shared/common/verified';
import {ProfileLayoutProps} from '@spinach/next/ui/base/layout/profile/type';


export const ProfileLayoutInfo = ({session}: ProfileLayoutProps) => {
  const {username, status} = session.user;

  return (
    <Flex direction="row" noFullWidth className="items-center gap-2">
      <ProfileIcon/>
      <Flex noFullWidth>
        <div className="text-3xl text-slate-200">
          {username}
        </div>
        <VerificationStatusUi status={status}/>
      </Flex>
    </Flex>
  );
};
