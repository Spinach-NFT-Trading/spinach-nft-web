import React from 'react';

import {getServerSession} from 'next-auth';

import {Failed} from '@spinach/next/components/icons/failed';
import {UsdtIcon} from '@spinach/next/components/icons/usdt';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {NextImage} from '@spinach/next/components/shared/common/image/main';
import {CopyButton} from '@spinach/next/components/shared/copy';
import {authOptions} from '@spinach/next/const/auth';
import {getDepositWallet} from '@spinach/next/controller/gold';
import {NextPageProps} from '@spinach/next/types/next/page';
import {PageLayout} from '@spinach/next/ui/base/layout/common';
import {GoldExchangeConfirmSection} from '@spinach/next/ui/gold/confirm/common/section';


type GoldExchangeConfirmUsdtParams = {
  amount?: number,
};

export const GoldExchangeConfirmUsdt = async ({searchParams}: NextPageProps<GoldExchangeConfirmUsdtParams>) => {
  const [
    session,
    wallet,
  ] = await Promise.all([
    getServerSession(authOptions),
    getDepositWallet(),
  ]);

  if (!session) {
    return <Failed text="Session"/>;
  }

  if (!wallet) {
    return <Failed text="Deposit Wallet"/>;
  }

  if (wallet.channel !== 'crypto') {
    return <Failed text="Wallet not Crypto"/>;
  }

  return (
    <PageLayout>
      <div className="flex w-full justify-center">
        <Flex className="gap-2 md:w-1/2">
          <Flex className="info-section gap-2">
            <GoldExchangeConfirmSection title="幣種" content={
              <Flex direction="row" className="gap-1">
                <div className="h-6 w-6">
                  <UsdtIcon/>
                </div>
                <div>USDT</div>
              </Flex>
            }/>
            <GoldExchangeConfirmSection title="區塊鍊" content="TRC20 (Tron)"/>
            <GoldExchangeConfirmSection title="充幣金額" content={searchParams?.amount ?? '-'}/>
            <GoldExchangeConfirmSection title="充幣地址" noBackground content={
              <Flex center className="gap-2 p-3">
                <div className="relative h-36 w-36">
                  <NextImage src="/line-qr.png" alt="LINE"/>
                </div>
                <div className="text-slate-400">
                  僅支援對該地址充值 USDT
                </div>
              </Flex>
            }/>
            <Flex direction="row" center className="gap-2 rounded-lg bg-slate-950/70 p-1.5">
              <pre className="text-xl">
                {wallet.wallet}
              </pre>
              <Flex noFullWidth>
                <CopyButton data={wallet.wallet}/>
              </Flex>
            </Flex>
          </Flex>
          <Flex>
            <ul className="list-inside list-disc text-left text-sm text-slate-400">
              <li>請勿向上述地址充值 USDT 外的資產，否則將會導致資產丟失。</li>
              <li>請確保您行動裝置的安全，防止資訊被竄改或洩漏。</li>
              <li>TRC20-USDT 僅支援轉傳功能，使用其他智能合約的轉帳充值暫時無法入帳，請您諒解。</li>
            </ul>
          </Flex>
        </Flex>
      </div>
    </PageLayout>
  );
};