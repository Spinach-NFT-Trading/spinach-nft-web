import React from 'react';

import ArrowDownRightIcon from '@heroicons/react/24/outline/ArrowDownRightIcon';
import ArrowUpRightIcon from '@heroicons/react/24/outline/ArrowUpRightIcon';
import {UserDataMap, UserInfo} from '@spinach/common/types/common/user';
import clsx from 'clsx';
import {format} from 'date-fns/format';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {NftTxnModelClient} from '@spinach/next/types/mongo/nft';
import {formatUserNameFromMap} from '@spinach/next/utils/data/user';


type Props = {
  member: UserInfo,
  userDataMap: UserDataMap,
  txn: NftTxnModelClient,
};

export const AdminMemberNftTxnRow = ({
  member,
  userDataMap,
  txn,
}: Props) => {
  const isSelling = txn.from === member.id;
  const isBuying = txn.to === member.id;

  return (
    <Flex direction="row" noFullWidth className="not-last:border-b border-b-slate-400 p-2">
      <Flex center noFullWidth className="w-40">
        {format(txn.epochMs, 'yyyy-MM-dd HH:mm:ss')}
      </Flex>
      <Flex direction="row" center noFullWidth className={clsx(
        'w-20 gap-1',
        isSelling && 'text-red-300',
        isBuying && 'text-green-300',
      )}>
        {
          isSelling &&
          <>
            <ArrowUpRightIcon className="h-5 w-5"/>
            <span>販售</span>
          </>
        }
        {
          isBuying &&
          <>
            <ArrowDownRightIcon className="h-5 w-5"/>
            <span>購買</span>
          </>
        }
      </Flex>
      <Flex center noFullWidth className="w-52 text-sm">
        {txn.nftId}
      </Flex>
      <Flex center noFullWidth className="w-52 text-sm">
        {isSelling && formatUserNameFromMap({userDataMap, userId: txn.to})}
        {isBuying && formatUserNameFromMap({userDataMap, userId: txn.from})}
      </Flex>
    </Flex>
  );
};

