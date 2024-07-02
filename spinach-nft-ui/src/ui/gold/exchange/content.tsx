import React from 'react';

import ArrowDownCircleIcon from '@heroicons/react/24/outline/ArrowDownCircleIcon';
import ArrowRightIcon from '@heroicons/react/24/outline/ArrowRightIcon';
import {GoldExchangeChannel} from '@spinach/common/types/data/gold/common';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {InputFloatingLabel} from '@spinach/next/components/shared/common/input/field';
import {goldExchangeChannelI18nId} from '@spinach/next/const/gold';
import {GoldExchangeConfirmPopup} from '@spinach/next/ui/gold/exchange/confirm';
import {GoldExchangeCryptoTutorial} from '@spinach/next/ui/gold/exchange/tutorial';
import {ExchangeAmount} from '@spinach/next/ui/gold/exchange/type';
import {formatFloat2, formatFloat3} from '@spinach/next/utils/number/format';


const defaultSource = 1000;

type Props = {
  exchangeChannel: GoldExchangeChannel,
  exchangeRate: number,
  cashbackRate: number,
  getRedirectUrl: (amount: ExchangeAmount) => string,
};

export const GoldExchangeContent = ({exchangeChannel, exchangeRate, cashbackRate, getRedirectUrl}: Props) => {
  const [show, setShow] = React.useState(false);
  const [amount, setAmount] = React.useState<ExchangeAmount>({
    source: defaultSource,
    gold: parseFloat((defaultSource * exchangeRate * (1 + cashbackRate)).toFixed(2)),
  });

  const t = useTranslations('UI.Gold.ExchangeChannel');
  const t2 = useTranslations('UI.InPage.Gold.Exchange');

  return (
    <>
      <GoldExchangeConfirmPopup
        amount={amount}
        show={show}
        setShow={setShow}
        getRedirectUrl={getRedirectUrl}
      />
      <Flex center>
        <Flex center className="m-2 gap-3 md:w-1/2 md:p-7">
          {
            exchangeChannel === 'crypto' &&
            <GoldExchangeCryptoTutorial/>
          }
          <InputFloatingLabel
            id={exchangeChannel}
            type="number"
            step={0.01}
            placeholder={t(goldExchangeChannelI18nId[exchangeChannel])}
            value={amount.source.toString()}
            onChange={({target}) => {
              const source = parseInt(target.value || '0');
              const gold = parseFloat((source * exchangeRate * (1 + cashbackRate)).toFixed(2));

              setAmount({source, gold});
            }}
          />
          <div className="size-10">
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
              const source = parseFloat((gold / exchangeRate / (1 + cashbackRate)).toFixed(2));

              setAmount({source, gold});
            }}
          />
          <Flex className="info-section gap-1.5 xl:flex-row">
            <Flex center className="gap-1.5">
              <span>
                {t2('CurrencyRate')}
              </span>
              <Flex center direction="row" className="gap-1.5">
                1 {t(goldExchangeChannelI18nId[exchangeChannel])}
                <div className="size-4">
                  <ArrowRightIcon/>
                </div>
                {formatFloat3(exchangeRate)} GOLD
              </Flex>
            </Flex>
            <Flex center className="gap-1.5">
              <span>
                {t2('Cashback')}
              </span>
              <div>
                {formatFloat2(amount.gold / (1 + cashbackRate) * cashbackRate)} GOLD
              </div>
            </Flex>
          </Flex>
          <Flex center>
            <button className="button-clickable-bg w-1/2 p-2" onClick={() => setShow(true)}>
              {t2('Buy')}
            </button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
