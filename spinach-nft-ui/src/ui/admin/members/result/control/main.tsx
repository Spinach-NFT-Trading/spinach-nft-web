import React from 'react';

import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon';
import {useTranslations} from 'next-intl';

import {FlexButton} from '@spinach/next/components/layout/flex/button';
import {adminMemberSingleResultButtonStyle} from '@spinach/next/ui/admin/members/result/const';
import {AdminMemberControlMenuSelection} from '@spinach/next/ui/admin/members/result/control/selection';
import {AdminMemberPopupType} from '@spinach/next/ui/admin/members/result/popup/type';


type Props = {
  showPopup: (type: AdminMemberPopupType) => void,
};

export const AdminMemberSingleControls = ({showPopup}: Props) => {
  const [show, setShow] = React.useState(false);

  const t = useTranslations('UI.InPage.Admin.Members.Control');

  return (
    <>
      <AdminMemberControlMenuSelection
        show={show}
        setShow={setShow}
        onOptionSelect={(type) => showPopup(type)}
      />
      <FlexButton className={adminMemberSingleResultButtonStyle} onClick={() => setShow(true)}>
        <Cog6ToothIcon className="size-6"/>
        <div>{t('Settings')}</div>
      </FlexButton>
    </>
  );
};
