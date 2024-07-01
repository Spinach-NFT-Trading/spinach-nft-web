import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {NextImage} from '@spinach/next/components/shared/common/image/main';
import {CopyButton} from '@spinach/next/components/shared/copy';
import {GoldExchangeConfirmLayout} from '@spinach/next/ui/gold/confirm/common/layout';
import {GoldExchangeConfirmSection} from '@spinach/next/ui/gold/confirm/common/section';
import {GoldExchangeConfirmPageProps} from '@spinach/next/ui/gold/confirm/common/type';


export const GoldExchangeConfirmUsdt = async ({searchParams}: GoldExchangeConfirmPageProps) => {
  return (
    <GoldExchangeConfirmLayout channel="crypto" amount={searchParams?.amount}>
      {({wallet}) => (
        <>
          <GoldExchangeConfirmSection title="區塊鍊" content="TRC20 (Tron)"/>
          <GoldExchangeConfirmSection title="充幣地址" noBackground content={
            <Flex center className="gap-2 p-3">
              <div className="relative size-36">
                <NextImage src="/line-qr.png" alt="LINE"/>
              </div>
              <div className="text-slate-400">
                僅支援對該地址充值 USDT
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
            <li>請勿向上述地址充值 USDT 外的資產，否則將會導致資產丟失。</li>
            <li>請確保您行動裝置的安全，防止資訊被竄改或洩漏。</li>
            <li>TRC20-USDT 僅支援轉傳功能，使用其他智能合約的轉帳充值暫時無法入帳，請您諒解。</li>
          </ul>
        </>
      )}
    </GoldExchangeConfirmLayout>
  );
};
