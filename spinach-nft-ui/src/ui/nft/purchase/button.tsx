'use client';
import React from 'react';

import {NftPurchaseConfirmPopup} from '@spinach/next/ui/nft/purchase/popup';


type Props = {
  nftId: string,
};

export const NftPurchaseButton = ({nftId}: Props) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <NftPurchaseConfirmPopup nftId={nftId} show={show} setShow={setShow}/>
      <button onClick={() => setShow(true)} className="button-clickable-bg p-2">
        確認
      </button>
    </>
  );
};
