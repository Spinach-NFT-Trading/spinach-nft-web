import React from 'react';

import {getTranslations} from 'next-intl/server';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {NextImage} from '@spinach/next/components/shared/common/image/main';
import {CopyButton} from '@spinach/next/components/shared/copy';
import {GoldExchangeConfirmLayout} from '@spinach/next/ui/gold/confirm/common/layout';
import {GoldExchangeConfirmSection} from '@spinach/next/ui/gold/confirm/common/section';
import {GoldExchangeConfirmPageProps} from '@spinach/next/ui/gold/confirm/common/type';


export const GoldExchangeConfirmUsdt = async ({searchParams}: GoldExchangeConfirmPageProps) => {
  const t = await getTranslations('UI.InPage.Gold.Confirm.Usdt');

  return (
    <GoldExchangeConfirmLayout channel="crypto" amount={searchParams?.amount}>
      {({wallet}) => (
        <>
          <GoldExchangeConfirmSection title={t('Field.Chain')} content="TRC20 (Tron)"/>
          <GoldExchangeConfirmSection title={t('Field.Address')} noBackground content={
            <Flex center className="gap-2 p-3">
              <div className="relative size-36">
                <NextImage src="/line-qr.png" alt="LINE"/>
              </div>
              <div className="text-slate-400">
                {t('Message.UsdtOnly')}
              </div>
            </Flex>
          }/>
          <Flex direction="row" center className="gap-2 rounded-lg bg-slate-950/70 p-1.5">
            <pre className="text-xl">
              {wallet}
            </pre>
            <Flex noFullWidth>
              <CopyButton data={wallet}/>
            </Flex>
          </Flex>
          <ul className="list-inside list-disc text-left text-sm text-slate-400">
            <li>{t('Note.NoOtherThanUsdt')}</li>
            <li>{t('Note.SecureDevice')}</li>
            <li>{t('Note.NoOtherContracts')}</li>
          </ul>
        </>
      )}
    </GoldExchangeConfirmLayout>
  );
};
