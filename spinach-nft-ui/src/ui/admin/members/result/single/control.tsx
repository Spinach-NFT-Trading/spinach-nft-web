import React from 'react';

import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import IdentificationIcon from '@heroicons/react/24/outline/IdentificationIcon';

import {FlexButton} from '@spinach/next/components/layout/flex/button';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {adminMemberSingleResultButtonStyle} from '@spinach/next/ui/admin/members/result/single/const';
import {AdminMemberPopupState} from '@spinach/next/ui/admin/members/result/single/popup/type';


type Props = {
  setPopup: (updated: AdminMemberPopupState) => void,
};

export const AdminMemberSingleControls = ({
  setPopup,
}: Props) => {
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
    </Flex>
  );
};
