import React from 'react';

import {UserInfo} from '@spinach/common/types/common/user';

import {FlexButton} from '@spinach/next/components/layout/flex/button';


type Props = {
  user: UserInfo,
  onClick: () => void,
};

export const AdminPendingVerificationSingle = ({user, onClick}: Props) => {
  const {name, username} = user;

  return (
    <FlexButton noFullWidth={false} className="button-clickable-bg px-3 py-5" onClick={onClick}>
      {name} (@{username})
    </FlexButton>
  );
};
