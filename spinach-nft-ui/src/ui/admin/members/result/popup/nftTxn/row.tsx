import React from 'react';

import ArrowDownRightIcon from '@heroicons/react/24/outline/ArrowDownRightIcon';
import ArrowUpRightIcon from '@heroicons/react/24/outline/ArrowUpRightIcon';
import {UserDataMap} from '@spinach/common/types/common/user/data';
import {UserInfo} from '@spinach/common/types/common/user/info';
import {clsx} from 'clsx';
import {format} from 'date-fns/format';
import {useTranslations} from 'next-intl';

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

  const t = useTranslations('UI.InPage.Admin.Members.Popup.NftTxn');

  return (
    <Flex direction="row" noFullWidth className="border-b-slate-400 p-2 not-last:border-b">
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
            <ArrowUpRightIcon className="size-5"/>
            <span>{t('Sell')}</span>
          </>
        }
        {
          isBuying &&
          <>
            <ArrowDownRightIcon className="size-5"/>
            <span>{t('Buy')}</span>
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

