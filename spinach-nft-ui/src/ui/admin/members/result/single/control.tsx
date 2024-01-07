import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import IdentificationIcon from '@heroicons/react/24/outline/IdentificationIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {UserInfo} from '@spinach/common/types/common/user';

import {FlexButton} from '@spinach/next/components/layout/flex/button';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {adminMemberSingleResultButtonStyle} from '@spinach/next/ui/admin/members/result/single/const';
import {AdminMemberPopupState} from '@spinach/next/ui/admin/members/result/single/popup/type';


export type AdminMemberSingleControlsProps = {
  isAdmin: boolean,
  member: UserInfo,
  onSetAgent: (enable: boolean) => void,
  agentToggleDisabled: boolean,
  setPopup: (updated: AdminMemberPopupState) => void,
};

export const AdminMemberSingleControls = ({
  isAdmin,
  member,
  onSetAgent,
  agentToggleDisabled,
  setPopup,
}: AdminMemberSingleControlsProps) => {
  const {
    agent,
  } = member;

  return (
    <Flex direction="row" noFullWidth className="gap-1">
      <FlexButton className={adminMemberSingleResultButtonStyle} onClick={() => setPopup({
        type: 'info',
        show: true,
      })}>
        <IdentificationIcon className="h-6 w-6"/>
        <div>帳號資訊</div>
      </FlexButton>
      <FlexButton className={adminMemberSingleResultButtonStyle} onClick={() => setPopup({
        type: 'bankDetails',
        show: true,
      })}>
        <CurrencyDollarIcon className="h-6 w-6"/>
        <div>銀行帳號資訊</div>
      </FlexButton>
      {
        isAdmin &&
        <FlexButton
          className={adminMemberSingleResultButtonStyle}
          onClick={() => onSetAgent(!agent)}
          disabled={agentToggleDisabled}
        >
          {agent ?
            <>
              <XCircleIcon className="h-6 w-6"/>
              <div>拔除代理</div>
            </> :
            <>
              <CheckCircleIcon className="h-6 w-6"/>
              <div>授予代理</div>
            </>
          }
        </FlexButton>
      }
    </Flex>
  );
};
