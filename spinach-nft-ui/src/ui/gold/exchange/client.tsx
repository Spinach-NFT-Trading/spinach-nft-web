'use client';
import React from 'react';

import ArrowDownCircleIcon from '@heroicons/react/24/outline/ArrowDownCircleIcon';
import ArrowRightIcon from '@heroicons/react/24/outline/ArrowRightIcon';

import {Flex} from '@spinach/next/components/layout/flex';
import {InputFloatingLabel} from '@spinach/next/components/shared/common/input/field';
import {ExchangeAmount} from '@spinach/next/ui/gold/exchange/type';
import {formatFloat2, formatFloat3} from '@spinach/next/utils/number';


const defaultUsdt = 1000;

type Props = {
  exchangeRate: number,
  cashbackRate: number,
};

export const GoldExchangeClient = ({exchangeRate, cashbackRate}: Props) => {
  const [amount, setAmount] = React.useState<ExchangeAmount>({
    usdt: defaultUsdt,
    gold: defaultUsdt * exchangeRate * (1 + cashbackRate),
  });

  return (
    <Flex direction="col" center>
      <Flex direction="col" center className="gap-3 md:w-1/2 md:p-7">
        <InputFloatingLabel
          id="usdt"
          type="number"
          step={0.01}
          placeholder="USDT"
          value={amount.usdt.toString()}
          onChange={({target}) => {
            const usdt = parseInt(target.value || '0');
            const gold = parseFloat((usdt * exchangeRate * (1 + cashbackRate)).toFixed(2));

            setAmount({usdt, gold});
          }}
        />
        <div className="h-10 w-10">
          <ArrowDownCircleIcon/>
        </div>
        <InputFloatingLabel
          id="gold"
          type="number"
          step={0.01}
          placeholder="GOLD"
          value={amount.gold.toString()}
          onChange={({target}) => {
            const gold = parseInt(target.value || '0');
            const usdt = parseFloat((gold / exchangeRate / (1 + cashbackRate)).toFixed(2));

            setAmount({usdt, gold});
          }}
        />
        <Flex direction="col" className="gap-1.5 md:flex-row">
          <Flex center direction="col" className="gap-1.5">
            <div>
              目前匯率
            </div>
            <Flex center direction="row" className="gap-1.5">
              1 USDT
              <div className="h-4 w-4">
                <ArrowRightIcon/>
              </div>
              {formatFloat3(exchangeRate)} GOLD
            </Flex>
          </Flex>
          <Flex center direction="col" className="gap-1.5">
            <div>
              用戶回饋
            </div>
            <div>
              {formatFloat2(amount.gold / (1 + cashbackRate) * cashbackRate)} GOLD
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
