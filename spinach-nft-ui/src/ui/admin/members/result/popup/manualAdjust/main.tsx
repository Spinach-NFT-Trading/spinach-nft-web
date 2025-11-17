import React from 'react';

import MinusIcon from '@heroicons/react/24/outline/MinusIcon';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {NumberInput} from '@spinach/next/components/shared/common/input/number/main';
import {recordManualBalanceAdjustment} from '@spinach/next/controller/user/update/manualAdjust';
import {useI18nApiErrorTranslator} from '@spinach/next/hooks/i18n/apiError/main';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {AdminMemberManualAdjustButton} from '@spinach/next/ui/admin/members/result/popup/manualAdjust/button';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/popup/type';


export const AdminMemberManualAdjustPopup = ({actor, member, setShow, refetch}: AdminMemberPopupProps) => {
  const {act, status} = useUserDataActor();

  const [value, setValue] = React.useState(0);
  const [error, setError] = React.useState<ApiErrorCode | null>(null);

  const translateApiError = useI18nApiErrorTranslator();

  const t = useTranslations('UI.InPage.Admin.Members.Popup.ManualAdjust');

  const onAdjustClicked = async (sign: 1 | -1) => {
    const amount = sign * Math.abs(value);
    if (amount === 0) {
      return;
    }

    setError(null);

    const result = await recordManualBalanceAdjustment({
      executorUserId: actor.id,
      targetUserId: member.id,
      amount,
    });

    if (result == null) {
      setShow(false);
      refetch();
      return;
    }

    setError(result);
  };

  const isDisabled = status === 'processing' || value === 0;

  if (act == null) {
    return null;
  }

  return (
    <Flex className="gap-1">
      {error && <Alert>{translateApiError(error)}</Alert>}
      <Flex direction="row" className="items-center gap-1">
        <span className="whitespace-nowrap">{t('Balance')}</span>
        <NumberInput
          type="required"
          value={value}
          classOfInputWidth="w-full"
          setValue={setValue}
          min={0}
        />
        <Flex direction="row" noFullWidth className="ml-auto gap-1">
          <AdminMemberManualAdjustButton disabled={isDisabled} onClick={() => void onAdjustClicked(1)}>
            <PlusIcon className="size-5"/>
            <span>{t('Add')}</span>
          </AdminMemberManualAdjustButton>
          <AdminMemberManualAdjustButton disabled={isDisabled} onClick={() => void onAdjustClicked(-1)}>
            <MinusIcon className="size-5"/>
            <span>{t('Subtract')}</span>
          </AdminMemberManualAdjustButton>
        </Flex>
      </Flex>
    </Flex>
  );
};
