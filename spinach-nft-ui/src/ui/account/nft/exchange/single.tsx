import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import {NftInfoModel} from '@spinach/common/types/data/nft';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {NextImage} from '@spinach/next/components/shared/common/image/main';
import {NftExchangeMatchedModelAtClient} from '@spinach/next/types/nft';
import {AccountNftExchangeConfirmPopup} from '@spinach/next/ui/account/nft/exchange/popup';
import {formatInt} from '@spinach/next/utils/number/format';


type Props = {
  match: NftExchangeMatchedModelAtClient,
  nft: NftInfoModel,
  onMatchConfirmed: (confirmedRequestUuid: string) => void,
};

export const AccountNftExchangeConfirmPendingSingle = ({match, nft, onMatchConfirmed}: Props) => {
  const {requested} = match.amount;
  const {seqId, image} = nft;

  const [show, setShow] = React.useState(false);

  return (
    <Flex direction="row" className="info-section items-center gap-4">
      <AccountNftExchangeConfirmPopup
        show={show}
        setShow={setShow}
        match={match}
        onMatchConfirmed={onMatchConfirmed}
      />
      <div className="relative size-20 shrink-0">
        <NextImage src={image} alt={`NFT #${seqId}`} className="rounded-lg"/>
      </div>
      <Flex className="text-xl font-semibold">
        <span>#{seqId}</span>
        <Flex className="whitespace-nowrap text-yellow-300">
          {formatInt(requested)} GOLD
        </Flex>
      </Flex>
      <button className="button-clickable-bg p-3" onClick={() => setShow(true)}>
        <CheckCircleIcon className="size-10"/>
      </button>
    </Flex>
  );
};
