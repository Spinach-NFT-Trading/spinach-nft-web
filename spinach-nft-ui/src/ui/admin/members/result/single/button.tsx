import React from 'react';

import clsx from 'clsx';

import {FlexButton} from '@spinach/next/components/layout/flex/button';


type Props = {
  text: string,
  isAdmin: boolean,
  active: boolean,
  disabled: boolean,
  onClick: (enabled: boolean) => void,
  icon: {
    active: React.ReactNode,
    inactive: React.ReactNode,
  },
  classOnActive?: string,
  classOnInactive?: string,
};

export const AdminMemberControlButton = ({
  text,
  isAdmin,
  active,
  disabled,
  onClick,
  icon,
  classOnActive,
  classOnInactive = 'text-slate-500',
}: Props) => {
  return (
    <FlexButton
      className={clsx(
        'items-center gap-0.5 whitespace-nowrap p-1 text-sm',
        isAdmin ? 'button-clickable-bg' : 'button-bg rounded-lg',
        active ? classOnActive : classOnInactive,
      )}
      onClick={() => isAdmin && onClick(!active)}
      disabled={disabled || !isAdmin}
    >
      {active ? icon.active : icon.inactive}
      <div>{text}</div>
    </FlexButton>
  );
};
