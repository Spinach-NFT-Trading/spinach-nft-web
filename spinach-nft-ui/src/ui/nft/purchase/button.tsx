'use client';
import React from 'react';

import {useTranslations} from 'next-intl';

import {NftPurchaseConfirmPopup} from '@spinach/next/ui/nft/purchase/popup/main';


type Props = {
  nftId: string,
};

export const NftPurchaseButton = ({nftId}: Props) => {
  const [show, setShow] = React.useState(false);

  const t = useTranslations('UI.InPage.Nft.Purchase');

  return (
    <>
      <NftPurchaseConfirmPopup nftId={nftId} show={show} setShow={setShow}/>
      <button onClick={() => setShow(true)} className="button-clickable-bg p-2">
        {t('Buy')}
      </button>
    </>
  );
};
