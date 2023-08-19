'use client';
import React from 'react';

import {recordNftTxn} from '@spinach/next/controller/nft';


export const NftPurchaseButton = () => {
  const [isPending, startTransition] = React.useTransition();

  return (
    <button
      className="button-clickable-bg" disabled={!isPending}
      onClick={() => startTransition(() => recordNftTxn())}
    >
      確認購買
    </button>
  );
};
