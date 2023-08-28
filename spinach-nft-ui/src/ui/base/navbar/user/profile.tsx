import React from 'react';

import UserIcon from '@heroicons/react/24/outline/UserIcon';
import {signOut} from 'next-auth/react';

import {Flex} from '@spinach/next/components/layout/flex';
import {UserControlCommonProps} from '@spinach/next/ui/base/navbar/user/type';


export const UserProfileButton = ({session}: UserControlCommonProps) => {
  if (!session) {
    return <></>;
  }

  return (
    <button className="nav-button-text group" onClick={() => signOut()}>
      <Flex direction="row" className="gap-1">
        <div className="transform-smooth relative h-5 w-5">
          <UserIcon/>
        </div>
        <div>
          {session.user.username}
        </div>
      </Flex>
    </button>
  );
};
