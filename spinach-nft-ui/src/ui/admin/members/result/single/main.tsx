import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import IdentificationIcon from '@heroicons/react/24/outline/IdentificationIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {UserInfo} from '@spinach/common/types/common/user';

import {FlexButton} from '@spinach/next/components/layout/flex/button';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {VerificationStatusUi} from '@spinach/next/components/shared/common/verified';
import {adminMemberSingleResultButtonStyle} from '@spinach/next/ui/admin/members/result/single/const';
import {AdminMemberPopup} from '@spinach/next/ui/admin/members/result/single/popup/main';
import {AdminMemberPopupState} from '@spinach/next/ui/admin/members/result/single/popup/type';
import {formatUserName} from '@spinach/next/utils/data/user';


type Props = {
  isAdmin: boolean,
  style: React.CSSProperties,
  member: UserInfo,
  onSetAgent: (enable: boolean) => void,
  agentToggleDisabled: boolean,
};

export const AdminMemberSingleResult = ({
  isAdmin,
  style,
  member,
  onSetAgent,
  agentToggleDisabled,
}: Props) => {
  const {
    status,
    agent,
  } = member;
  const [
    popup,
    setPopup,
  ] = React.useState<AdminMemberPopupState>({
    type: 'info',
    show: false,
  });

  return (
    <Flex direction="row" noFullWidth style={style} className="border-b-slate-400 py-1 not-last:border-b">
      <AdminMemberPopup
        show={popup.show}
        type={popup.type}
        setShow={(show) => setPopup((original) => ({
          ...original,
          show,
        }))}
        member={member}
      />
      <Flex noFullWidth className="w-40 justify-center">
        {formatUserName(member)}
      </Flex>
      <Flex noFullWidth center className="w-20">
        <VerificationStatusUi status={status}/>
      </Flex>
      <Flex noFullWidth center className="w-12">
        {agent && <span className="info-highlight px-1.5 py-1 text-sm">代理</span>}
      </Flex>
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
    </Flex>
  );
};
