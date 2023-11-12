import React from 'react';

import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon';

import {FlexLink} from '@spinach/next/components/layout/flex/link';
import {UserControlCommonProps} from '@spinach/next/ui/base/navbar/user/type';


export const UserProfileButton = ({session}: UserControlCommonProps) => {
  if (!session) {
    return <></>;
  }

  return (
    <FlexLink className="nav-button-text group gap-1" center href="/account">
      <div className="relative h-5 w-5">
        <UserCircleIcon/>
      </div>
      <div>
        {session.user.username}
      </div>
    </FlexLink>
  );
};
