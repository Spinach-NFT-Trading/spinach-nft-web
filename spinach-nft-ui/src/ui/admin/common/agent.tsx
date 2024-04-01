import React from 'react';

import {Nullable} from '@spinach/common/types/common/typing';
import {UserData} from '@spinach/common/types/common/user/data';
import clsx from 'clsx';

import {formatUserName} from '@spinach/next/utils/data/user';


type Props = {
  agent: Nullable<UserData>,
};

export const AdminAgentName = ({agent}: Props) => {
  return (
    <span className={clsx(!agent && 'text-slate-400')}>
      {agent ? formatUserName(agent) : '(無代理)'}
    </span>
  );
};
