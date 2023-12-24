'use client';
import React from 'react';

import {GoldExchangeContent} from '@spinach/next/ui/gold/exchange/content';


type Props = {
  usdtExchangeRate: number,
  cashbackRate: number,
};

export const GoldExchangeClient = ({usdtExchangeRate, cashbackRate}: Props) => {
  return (
    <GoldExchangeContent
      sourceCurrency="USDT"
      exchangeRate={usdtExchangeRate}
      cashbackRate={cashbackRate}
      getRedirectUrl={({source}) => `/gold/confirm/usdt?${new URLSearchParams({amount: source.toString()})}`}
    />
  );
};
