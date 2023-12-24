import React from 'react';

import {GoldExchangeChannel, GoldWalletTypeMap} from '@spinach/common/types/data/gold';
import {getServerSession} from 'next-auth';

import {Failed} from '@spinach/next/components/icons/failed';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {GoldExchangeChannelUi} from '@spinach/next/components/shared/gold/channel';
import {authOptions} from '@spinach/next/const/auth';
import {getDepositWallet} from '@spinach/next/controller/gold';
import {PageLayout} from '@spinach/next/ui/base/layout/common';
import {GoldExchangeConfirmSection} from '@spinach/next/ui/gold/confirm/common/section';


type Props<TChannel extends GoldExchangeChannel> = {
  channel: TChannel,
  amount: React.ReactNode,
  children: (wallet: GoldWalletTypeMap[TChannel]) => React.ReactNode,
};

export const GoldExchangeConfirmLayout = async <TChannel extends GoldExchangeChannel>({
  channel,
  amount,
  children,
}: Props<TChannel>) => {
  const [
    session,
    wallet,
  ] = await Promise.all([
    getServerSession(authOptions),
    getDepositWallet(channel),
  ]);

  if (!session) {
    return <Failed text="Session"/>;
  }

  if (!wallet) {
    return <Failed text="Deposit Wallet"/>;
  }

  if (wallet.channel !== channel) {
    return <Failed text={`Wallet not [${channel}]`}/>;
  }

  return (
    <PageLayout>
      <Flex className="items-center">
        <Flex className="gap-2 md:w-1/2">
          <Flex className="info-section gap-2">
            <GoldExchangeConfirmSection title="幣種" content={<GoldExchangeChannelUi channel={wallet.channel}/>}/>
            <GoldExchangeConfirmSection title="充幣金額" content={amount ?? '-'}/>
            {children(wallet as GoldWalletTypeMap[TChannel])}
          </Flex>
        </Flex>
      </Flex>
    </PageLayout>
  );
};
