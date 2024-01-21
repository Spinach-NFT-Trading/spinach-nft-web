import React from 'react';

import {ApiErrorCode} from '@spinach/common/types/api/error';
import clsx from 'clsx';
import {Session} from 'next-auth';

import {FlexButton} from '@spinach/next/components/layout/flex/button';


type Props = {
  text: string,
  isAdmin: boolean,
  active: boolean,
  disabled: boolean,
  icon: {
    active: React.ReactNode,
    inactive: React.ReactNode,
  },
  onSuccess: (newActive: boolean) => void,
  onError: (error: ApiErrorCode) => void,
  sendRequest: (newActive: boolean) => Promise<Session | null>,
  classOnActive?: string,
  classOnInactive?: string,
};

export const AdminMemberControlButton = ({
  text,
  isAdmin,
  active,
  disabled,
  icon,
  onSuccess,
  onError,
  sendRequest,
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
      onClick={async () => {
        if (!isAdmin) {
          return;
        }

        const newActive = !active;

        const session = await sendRequest(newActive);
        const error = session?.user.jwtUpdateError;
        if (error) {
          onError(error);
          return;
        }

        onSuccess(newActive);
      }}
      disabled={disabled || !isAdmin}
    >
      {active ? icon.active : icon.inactive}
      <div>{text}</div>
    </FlexButton>
  );
};
