'use client';
import React from 'react';

import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';
import {translateApiError} from '@spinach/common/utils/translate/apiError';
import {redirect} from 'next/navigation';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';


type Props = {
  nftId: string,
};

export const NftPurchaseButton = ({nftId}: Props) => {
  const [buttonText, setButtonText] = React.useState('確認購買');
  const {act, status, session} = useUserDataActor();

  React.useEffect(() => {
    if (status === 'failed') {
      setButtonText(translateApiError(session.data?.user.jwtUpdateError || '不明的錯誤'));
      return;
    }

    if (status === 'completed') {
      redirect('/account/profile');
    }
  }, [status]);

  return (
    <button
      className="enabled:button-clickable-bg disabled:button-disabled p-2"
      disabled={status === 'processing' || status === 'failed'}
      onClick={() => act && act({action: 'request', options: {type: 'nftBuy', data: {nftId}}})}
    >
      <Flex direction="row" center className="gap-1">
        {status === 'failed' && <div className="h-6 w-6"><ExclamationTriangleIcon/></div>}
        <div>{buttonText}</div>
      </Flex>
    </button>
  );
};
