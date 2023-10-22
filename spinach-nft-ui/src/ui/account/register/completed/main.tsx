import React from 'react';

import {AnimatedCollapse} from '@spinach/next/components/layout/collapsible/animated';
import {AccountRegisterInstruction} from '@spinach/next/ui/account/register/instruction';


type Props = {
  show: boolean,
};

export const AccountRegisterCompleted = ({show}: Props) => {
  return (
    <AnimatedCollapse show={show}>
      <AccountRegisterInstruction/>
    </AnimatedCollapse>
  );
};
