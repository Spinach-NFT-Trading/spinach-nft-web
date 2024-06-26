import React from 'react';

import {ApiErrorCode} from '@spinach/common/types/api/error';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Popup} from '@spinach/next/components/popup';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {useI18nApiErrorTranslator} from '@spinach/next/hooks/i18n/apiError/main';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {NftExchangeMatchedModelAtClient} from '@spinach/next/types/nft';
import {formatInt} from '@spinach/next/utils/number/format';


type Props = {
  show: boolean,
  setShow: (show: boolean) => void,
  match: NftExchangeMatchedModelAtClient,
  onMatchConfirmed: (confirmedRequestUuid: string) => void,
};

export const AccountNftExchangeConfirmPopup = ({show, setShow, match, onMatchConfirmed}: Props) => {
  const {amount, requestUuid} = match;

  const [error, setError] = React.useState<ApiErrorCode | null>(null);

  const {act} = useUserDataActor();

  const t = useTranslations('UI.InPage.Account.Nft.Exchange');

  const translateApiError = useI18nApiErrorTranslator();

  if (!act) {
    return null;
  }

  const onClick = async () => {
    const session = await act({
      action: 'request',
      options: {
        type: 'nft.sell',
        data: {matchRequestUuid: requestUuid},
      },
    });
    const error = session?.user.jwtUpdateError;
    if (!error) {
      onMatchConfirmed(requestUuid);
      window.location.reload();
      return;
    }

    setError(error);
  };

  return (
    <Popup show={show} setShow={setShow}>
      <Flex center className="gap-2">
        {error && <Alert>{translateApiError(error)}</Alert>}
        <div className="text-xl">
          {t('Popup.Title')}
        </div>
        <hr className="w-full"/>
        <div>
          {t('Popup.Message', {amount: formatInt(amount.requested)})}
        </div>
        <button className="button-clickable-bg w-1/2 p-2" onClick={onClick}>
          {t('Popup.Button')}
        </button>
      </Flex>
    </Popup>
  );
};
