import React from 'react';

import ArrowsRightLeftIcon from '@heroicons/react/24/outline/ArrowsRightLeftIcon';
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import IdentificationIcon from '@heroicons/react/24/outline/IdentificationIcon';
import PhotoIcon from '@heroicons/react/24/outline/PhotoIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Popup} from '@spinach/next/components/popup';
import {AdminMemberControlMenuButton} from '@spinach/next/ui/admin/members/result/control/button';
import {AdminMemberPopupType} from '@spinach/next/ui/admin/members/result/popup/type';


type Props = {
  show: boolean,
  setShow: (show: boolean) => void,
  onOptionSelect: (type: AdminMemberPopupType) => void,
};

export const AdminMemberControlMenuSelection = ({
  show,
  setShow,
  onOptionSelect,
}: Props) => {
  const t = useTranslations('UI.InPage.Admin.Members.Control');

  const onOptionClick = (type: AdminMemberPopupType) => {
    onOptionSelect(type);
    setShow(false);
  };

  return (
    <Popup show={show} setShow={setShow} className="w-auto">
      <Flex className="gap-2">
        <AdminMemberControlMenuButton onClick={() => onOptionClick('info')}>
          <IdentificationIcon className="size-6"/>
          <div>{t('AccountInfo')}</div>
        </AdminMemberControlMenuButton>
        <AdminMemberControlMenuButton onClick={() => onOptionClick('bankDetails')}>
          <CurrencyDollarIcon className="size-6"/>
          <div>{t('BankDetails')}</div>
        </AdminMemberControlMenuButton>
        <AdminMemberControlMenuButton onClick={() => onOptionClick('nftTxn')}>
          <ArrowsRightLeftIcon className="size-6"/>
          <div>{t('TxnHistory')}</div>
        </AdminMemberControlMenuButton>
        <AdminMemberControlMenuButton onClick={() => onOptionClick('balanceHistory')}>
          <CurrencyDollarIcon className="size-6"/>
          <div>{t('BalanceHistory')}</div>
        </AdminMemberControlMenuButton>
        <AdminMemberControlMenuButton onClick={() => onOptionClick('manualAdjust')}>
          <CurrencyDollarIcon className="size-6"/>
          <div>{t('ManualAdjust')}</div>
        </AdminMemberControlMenuButton>
        <AdminMemberControlMenuButton onClick={() => onOptionClick('idVerificationImages')}>
          <PhotoIcon className="size-6"/>
          <div>{t('IdVerificationImages')}</div>
        </AdminMemberControlMenuButton>
        <AdminMemberControlMenuButton onClick={() => onOptionClick('setPassword')}>
          <LockClosedIcon className="size-6"/>
          <div>{t('SetPassword')}</div>
        </AdminMemberControlMenuButton>
      </Flex>
    </Popup>
  );
};
