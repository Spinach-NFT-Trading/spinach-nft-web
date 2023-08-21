'use client';
import React from 'react';

import {redirect} from 'next/navigation';

import {useUserDataActor} from '@spinach/next/hooks/userData/actor';


type Props = {
  nftId: string,
};

export const NftPurchaseButton = ({nftId}: Props) => {
  const {act, status} = useUserDataActor();

  React.useEffect(() => {
    if (status === 'completed') {
      redirect('/account/profile');
    }
  }, [status]);

  return (
    <button
      className="enabled:button-clickable-bg disabled:button-disabled p-2"
      disabled={status === 'processing'}
      onClick={() => act && act({action: 'request', options: {type: 'nftBuy', data: {nftId}}})}
    >
      確認購買
    </button>
  );
};
