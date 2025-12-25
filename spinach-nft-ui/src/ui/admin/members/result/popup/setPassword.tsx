import React from 'react';

import CloudArrowUpIcon from '@heroicons/react/24/outline/CloudArrowUpIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexForm} from '@spinach/next/components/layout/flex/form';
import {InputBox} from '@spinach/next/components/shared/common/input/box';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/popup/type';


export const AdminMemberSetPasswordPopup = ({member, setShow}: AdminMemberPopupProps) => {
  const {act, status} = useUserDataActor();

  const [password, setPassword] = React.useState('');

  const t = useTranslations('UI.InPage.Admin.Members.Popup.SetPassword');

  if (act == null) {
    return null;
  }

  const isPasswordValid = password.length > 0;

  return (
    <FlexForm className="gap-2" onSubmit={async () => {
      await act({
        action: 'request',
        options: {
          type: 'admin.member.setPassword',
          data: {
            memberId: member.id,
            password,
          },
        },
      });
      setShow(false);
    }}>
      <Flex direction="row" className="items-center gap-1">
        <span className="w-32">{t('UserId')}</span>
        <span>{member.username}</span>
      </Flex>
      <Flex direction="row" className="items-center gap-1">
        <span className="w-32">{t('Password')}</span>
        <InputBox
          value={password}
          type="password"
          onChange={({target}) => setPassword(target.value)}
          autoComplete="new-password"
        />
      </Flex>
      <Flex direction="row" className="items-center gap-1">
        <button
          type="submit"
          className="button-clickable-bg ml-auto rounded-lg p-1 disabled:opacity-50"
          disabled={status === 'processing' || !isPasswordValid}
        >
          <CloudArrowUpIcon className="size-6"/>
        </button>
      </Flex>
    </FlexForm>
  );
};
