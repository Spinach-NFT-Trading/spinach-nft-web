'use client';
import React from 'react';

import {GlobalCashbackPercent} from '@spinach/common/types/data/global';

import {useTabbedContentControl} from '@spinach/next/components/layout/tab/hook';
import {TabbedContent} from '@spinach/next/components/layout/tab/main';
import {GoldExchangeContent} from '@spinach/next/ui/gold/exchange/content';


type Props = {
  usdtExchangeRate: number,
  cashbackPercent: GlobalCashbackPercent,
};

export const GoldExchangeClient = ({usdtExchangeRate, cashbackPercent}: Props) => {
  const tabControl = useTabbedContentControl<'usdt' | 'twBank'>('usdt');

  return (
    <>
      <TabbedContent
        keys={['usdt', 'twBank']}
        control={tabControl}
        tabTitle={{
          usdt: 'USDT',
          twBank: '台幣',
        }}
        content={{
          usdt: (
            <GoldExchangeContent
              exchangeChannel="crypto"
              exchangeRate={usdtExchangeRate}
              cashbackRate={cashbackPercent.crypto}
              getRedirectUrl={({source}) => (
                `/gold/confirm/usdt?${new URLSearchParams({amount: source.toString()})}`
              )}
            />
          ),
          twBank: (
            <GoldExchangeContent
              exchangeChannel="twBank"
              exchangeRate={1}
              cashbackRate={cashbackPercent.twBank}
              getRedirectUrl={({source}) => (
                `/gold/confirm/twBank?${new URLSearchParams({amount: source.toString()})}`
              )}
            />
          ),
        }}
        getReactKey={(key) => key}
      />
    </>
  );
};
