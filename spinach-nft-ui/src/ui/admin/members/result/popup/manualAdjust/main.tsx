import React from 'react';

import CloudArrowUpIcon from '@heroicons/react/24/outline/CloudArrowUpIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {InputBox} from '@spinach/next/components/shared/common/input/box';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/popup/type';


export const AdminMemberManualAdjustPopup = ({member, setShow}: AdminMemberPopupProps) => {
  const {
    act,
    status,
  } = useUserDataActor();

  const [value, setValue] = React.useState(0);

  const t = useTranslations('UI.InPage.Admin.Members.Popup.ManualAdjust');

  if (act == null) {
    return null;
  }

  return (
    <Flex direction="row" className="items-center gap-1">
      <span>{t('Balance')}</span>
      <InputBox
        value={value.toString()}
        type="number"
        className="w-24 text-center"
        onChange={({target}) => {
          if (!target.value) {
            setValue(0);
            return;
          }

          setValue(parseFloat(target.value));
        }}
      />
      <button
        className="button-clickable-bg ml-auto rounded-lg p-1"
        onClick={async () => {
          await act({
            action: 'request',
            options: {
              type: 'admin.member.manualAdjust',
              data: {
                memberId: member.id,
                amount: value,
              },
            },
          });
          setShow(false);
        }}
        disabled={status === 'processing'}
      >
        <CloudArrowUpIcon className="size-6"/>
      </button>
    </Flex>
  );
};
