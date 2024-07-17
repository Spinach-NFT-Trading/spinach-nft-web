import React from 'react';

import {NftExchangeQueuedData} from '@spinach/common/types/data/nft/queue';

import {CountUp} from '@spinach/next/components/shared/time/countUp';
import {formatInt} from '@spinach/next/utils/number/format';


type Props = {
  data: NftExchangeQueuedData,
};

export const AdminExchangeRequestsQueuedRow = ({data}: Props) => {
  const {token, amount, createdAtEpochMs} = data;

  return (
    <>
      <td className="w-20">
        {formatInt(amount)}
      </td>
      <td className="w-40">
        <CountUp
          date={new Date(createdAtEpochMs)}
          getStyleClass={(totalSeconds) => {
            if (totalSeconds > 180) {
              return 'text-red-400';
            }

            if (totalSeconds > 120) {
              return 'text-yellow-400';
            }

            return null;
          }}
        />
      </td>
      <td className="w-96">
        <code>{token}</code>
      </td>
    </>
  );
};
