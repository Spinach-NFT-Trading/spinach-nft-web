import React from 'react';

import {getServerSession} from 'next-auth';

import {Failed} from '@spinach/next/components/icons/failed';
import {UsdtIcon} from '@spinach/next/components/icons/usdt';
import {Flex} from '@spinach/next/components/layout/flex';
import {NextImage} from '@spinach/next/components/shared/common/image';
import {CopyButton} from '@spinach/next/components/shared/copy';
import {authOptions} from '@spinach/next/const/auth';
import {getDepositWallet} from '@spinach/next/controller/gold';
import {NextPageProps} from '@spinach/next/types/next/page';
import {PageLayout} from '@spinach/next/ui/base/layout/common';
import {GoldExchangeConfirmSection} from '@spinach/next/ui/gold/confirm/section';


type GoldExchangeConfirmParams = {
  amount?: number,
};

export const GoldExchangeConfirm = ({params}: NextPageProps<GoldExchangeConfirmParams>) => {
  const session = React.use(getServerSession(authOptions));
  const wallet = React.use(getDepositWallet());

  if (!session) {
    return <Failed text="Session"/>;
  }

  if (!wallet) {
    return <Failed text="Deposit Wallet"/>;
  }

  return (
    <PageLayout>
      <Flex direction="col" center className="gap-2">
        <Flex direction="col" className="gap-2 md:w-1/2">
          <GoldExchangeConfirmSection title="幣種" content={
            <Flex direction="row" center className="gap-1">
              <div className="h-6 w-6">
                <UsdtIcon/>
              </div>
              <div>USDT</div>
            </Flex>
          }/>
          <GoldExchangeConfirmSection title="區塊鍊" content="TRC20 (Tron)"/>
          <GoldExchangeConfirmSection title="充幣金額" content={params.amount ?? '-'}/>
          <GoldExchangeConfirmSection title="充幣地址" content={
            <Flex direction="col" center className="gap-2 p-3">
              <div className="relative h-36 w-36">
                <NextImage src="/line-qr.png" alt="LINE"/>
              </div>
              <div className="text-slate-400">
                僅支援對該地址充值 USDT
              </div>
            </Flex>
          }/>
          <Flex direction="row" center className="gap-2 rounded-lg bg-slate-700/30 p-1.5">
            <pre className="text-xl">
              {wallet.wallet}
            </pre>
            <Flex direction="col" noFullWidth>
              <CopyButton data={wallet.wallet}/>
            </Flex>
          </Flex>
          <Flex direction="col">
            <ul className="list-inside list-disc text-left text-sm text-slate-400">
              <li>請勿向上述地址充值 USDT 外的資產，否則將會導致資產丟失。</li>
              <li>請確保您行動裝置的安全，防止資訊被竄改或洩漏。</li>
              <li>TRC20-USDT 僅支援轉傳功能，使用其他智能合約的轉帳充值暫時無法入帳，請您諒解。</li>
            </ul>
          </Flex>
        </Flex>
      </Flex>
    </PageLayout>
  );
};
