import React from 'react';

import {NftExchangeMatchedData} from '@spinach/common/types/data/nft/match';
import {BankDetailsMap} from '@spinach/common/types/data/user/bank';

import {CountUp} from '@spinach/next/components/shared/time/countUp';
import {formatBankDetails} from '@spinach/next/utils/data/user';
import {formatInt} from '@spinach/next/utils/number/format';


type Props = {
  data: NftExchangeMatchedData,
  bankDetailsMap: BankDetailsMap,
};

export const AdminExchangeRequestsMatchedRow = ({data, bankDetailsMap}: Props) => {
  const {
    requestUuid,
    token,
    amount,
    matchedAtEpochMs,
    bankDetailsUuid,
  } = data;

  return (
    <>
      <td className="w-96">
        {requestUuid}
      </td>
      <td className="w-40">
        <CountUp
          date={new Date(matchedAtEpochMs)}
          getStyleClass={(totalSeconds) => {
            if (totalSeconds > 300) {
              return 'text-red-400';
            }

            if (totalSeconds > 180) {
              return 'text-yellow-400';
            }

            return null;
          }}
        />
      </td>
      <td className="w-20">
        {formatInt(amount.requested)}
      </td>
      <td className="w-20">
        {formatInt(amount.matched)}
      </td>
      <td className="w-20">
        {formatInt(amount.refunded)}
      </td>
      <td className="w-96">
        {token}
      </td>
      <td className="w-96">
        {bankDetailsUuid.map((uuid) => {
          const bankDetails = bankDetailsMap[uuid];
          if (!bankDetails) {
            return null;
          }

          return <span key={uuid}>{formatBankDetails(bankDetails)}</span>;
        })}
      </td>
    </>
  );
};
