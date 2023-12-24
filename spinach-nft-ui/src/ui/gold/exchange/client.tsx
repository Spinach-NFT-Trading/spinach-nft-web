'use client';
import React from 'react';

import {TabbedContent} from '@spinach/next/components/shared/common/tab/main';
import {GoldExchangeContent} from '@spinach/next/ui/gold/exchange/content';


type Props = {
  usdtExchangeRate: number,
  cashbackRate: number,
};

export const GoldExchangeClient = ({usdtExchangeRate, cashbackRate}: Props) => {
  return (
    <>
      <TabbedContent
        keys={['usdt', 'twBank']}
        defaultKey="usdt"
        tabTitle={{
          usdt: 'USDT',
          twBank: '台幣',
        }}
        content={{
          usdt: (
            <GoldExchangeContent
              sourceCurrency="USDT"
              exchangeRate={usdtExchangeRate}
              cashbackRate={cashbackRate}
              getRedirectUrl={({source}) => (
                `/gold/confirm/usdt?${new URLSearchParams({amount: source.toString()})}`
              )}
            />
          ),
          twBank: (
            <GoldExchangeContent
              sourceCurrency="台幣"
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
