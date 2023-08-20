import React from 'react';

import {Session} from 'next-auth';

import {formatFloat2} from '@spinach/next/utils/number';


type Props = {
  session: Session | null;
};

export const NavBarBalance = ({session}: Props) => {
  if (!session) {
    return <></>;
  }

  return (
    <div className="whitespace-nowrap">
      {formatFloat2(session.user.preloaded?.balance)} GOLD
    </div>
  );
};
