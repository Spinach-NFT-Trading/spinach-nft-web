'use client';
import React from 'react';

import {Grid} from '@spinach/next/components/layout/grid';
import {NftInfoMap} from '@spinach/next/types/mongo/nft';
import {NftExchangeMatchedModelAtClient} from '@spinach/next/types/nft';
import {AccountNftExchangeConfirmPendingSingle} from '@spinach/next/ui/account/nft/exchange/single';


type Props = {
  initialMatchedExchangeRequests: NftExchangeMatchedModelAtClient[],
  nftInfoMap: NftInfoMap,
};

export const AccountNftExchangeConfirmClient = ({initialMatchedExchangeRequests, nftInfoMap}: Props) => {
  const [
    matchedExchangeRequests,
    setMatchedExchangeRequests,
  ] = React.useState(initialMatchedExchangeRequests);

  return (
    <Grid className="grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      {matchedExchangeRequests.map((matched) => {
        const nft = nftInfoMap[matched.nftId];
        if (nft == null) {
          return null;
        }

        return (
          <AccountNftExchangeConfirmPendingSingle
            key={matched.requestUuid}
            match={matched}
            nft={nft}
            onMatchConfirmed={(confirmedRequestUuid) => setMatchedExchangeRequests((original) => (
              original.filter(({requestUuid}) => requestUuid !== confirmedRequestUuid)
            ))}
          />
        );
      })}
    </Grid>
  );
};
