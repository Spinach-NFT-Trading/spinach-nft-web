'use client';
import React from 'react';

import {useTabbedContentControl} from '@spinach/next/components/layout/tab/hook';
import {TabbedContent} from '@spinach/next/components/layout/tab/main';
import {GoldExchangeContent} from '@spinach/next/ui/gold/exchange/content';


type Props = {
  usdtExchangeRate: number,
  cashbackRate: number,
};

export const GoldExchangeClient = ({usdtExchangeRate, cashbackRate}: Props) => {
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
              cashbackRate={cashbackRate}
              getRedirectUrl={({source}) => (
                `/gold/confirm/usdt?${new URLSearchParams({amount: source.toString()})}`
              )}
            />
          ),
          twBank: (
            <GoldExchangeContent
              exchangeChannel="twBank"
              exchangeRate={1}
              cashbackRate={cashbackRate}
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
