import React from 'react';

import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import IdentificationIcon from '@heroicons/react/24/outline/IdentificationIcon';

import {FlexButton} from '@spinach/next/components/layout/flex/button';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {adminMemberSingleResultButtonStyle} from '@spinach/next/ui/admin/members/result/single/const';
import {AdminMemberPopupType} from '@spinach/next/ui/admin/members/result/single/popup/type';


type Props = {
  showPopup: (type: AdminMemberPopupType) => void,
};

export const AdminMemberSingleControls = ({
  showPopup,
}: Props) => {
  return (
    <Flex direction="row" noFullWidth className="gap-1 px-1">
      <FlexButton className={adminMemberSingleResultButtonStyle} onClick={() => showPopup('info')}>
        <IdentificationIcon className="h-6 w-6"/>
        <div>帳號資訊</div>
      </FlexButton>
      <FlexButton className={adminMemberSingleResultButtonStyle} onClick={() => showPopup('bankDetails')}>
        <CurrencyDollarIcon className="h-6 w-6"/>
        <div>銀行帳號資訊</div>
      </FlexButton>
      <FlexButton className={adminMemberSingleResultButtonStyle} onClick={() => showPopup('nftTxn')}>
        <CurrencyDollarIcon className="h-6 w-6"/>
        <div>交易紀錄</div>
      </FlexButton>
    </Flex>
  );
};
