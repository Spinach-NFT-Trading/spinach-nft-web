'use client';
import React from 'react';

import {GlobalCashbackPercent} from '@spinach/common/types/data/global';
import {signIn} from 'next-auth/react';

import {Loading} from '@spinach/next/components/icons/loading';
import {useTabbedContentControl} from '@spinach/next/components/layout/tab/hook';
import {TabbedContent} from '@spinach/next/components/layout/tab/main';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {GoldExchangeContent} from '@spinach/next/ui/gold/exchange/content';


type Props = {
  usdtExchangeRate: number,
};

export const GoldExchangeClient = ({usdtExchangeRate}: Props) => {
  const tabControl = useTabbedContentControl<'usdt' | 'twBank'>('usdt');
  const [
    cashbackPercent,
    setCashbackPercent,
  ] = React.useState<GlobalCashbackPercent | null>(null);

  const {act} = useUserDataActor();

  React.useEffect(() => {
    if (!act) {
      void signIn();
      return;
    }

    act({
      action: 'load',
      options: {type: 'globalConfig'},
    }).then((result) => setCashbackPercent(result?.user.lazyLoaded.globalConfig?.cashbackPercent ?? null));
  }, []);

  if (!cashbackPercent) {
    return <Loading/>;
  }

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
              cashbackRate={cashbackPercent.crypto / 100}
              getRedirectUrl={({source}) => (
                `/gold/confirm/usdt?${new URLSearchParams({amount: source.toString()})}`
              )}
            />
          ),
          twBank: (
            <GoldExchangeContent
              exchangeChannel="twBank"
              exchangeRate={1}
              cashbackRate={cashbackPercent.twBank / 100}
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
