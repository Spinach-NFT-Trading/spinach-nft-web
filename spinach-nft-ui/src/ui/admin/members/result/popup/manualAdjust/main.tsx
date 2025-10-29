import React from 'react';

import CloudArrowUpIcon from '@heroicons/react/24/outline/CloudArrowUpIcon';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexForm} from '@spinach/next/components/layout/flex/form';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {InputBox} from '@spinach/next/components/shared/common/input/box';
import {recordManualBalanceAdjustment} from '@spinach/next/controller/user/update/manualAdjust';
import {useI18nApiErrorTranslator} from '@spinach/next/hooks/i18n/apiError/main';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/popup/type';


export const AdminMemberManualAdjustPopup = ({actor, member, setShow, refetch}: AdminMemberPopupProps) => {
  const {act, status} = useUserDataActor();

  const [value, setValue] = React.useState(0);
  const [error, setError] = React.useState<ApiErrorCode | null>(null);

  const translateApiError = useI18nApiErrorTranslator();

  const t = useTranslations('UI.InPage.Admin.Members.Popup.ManualAdjust');

  if (act == null) {
    return null;
  }

  return (
    <Flex className="gap-1">
      {error && <Alert>{translateApiError(error)}</Alert>}
      <FlexForm direction="row" className="items-center gap-1" onSubmit={async () => {
        const result = await recordManualBalanceAdjustment({
          executorUserId: actor.id,
          targetUserId: member.id,
          amount: value,
        });
        if (result == null) {
          setShow(false);
          refetch();
          return;
        }

        setError(result);
      }}>
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
          type="submit"
          className="button-clickable-bg ml-auto rounded-lg p-1"
          disabled={status === 'processing'}
        >
          <CloudArrowUpIcon className="size-6"/>
        </button>
      </FlexForm>
    </Flex>
  );
};
