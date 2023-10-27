import React from 'react';

import BanknotesIcon from '@heroicons/react/24/outline/BanknotesIcon';
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import RocketLaunchIcon from '@heroicons/react/24/outline/RocketLaunchIcon';
import clsx from 'clsx';
import {Session} from 'next-auth';

import {UsdtIcon} from '@spinach/next/components/icons/usdt';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexLink} from '@spinach/next/components/layout/flex/link';
import {Grid} from '@spinach/next/components/layout/grid';
import {NextImage} from '@spinach/next/components/shared/common/image/main';
import {HomeStatsSection} from '@spinach/next/ui/home/stats';


type Props = {
  session: Session | null,
  currentFx: string | undefined,
};

export const HomeHeader = ({session, currentFx}: Props) => {
  return (
    <Flex className="gap-2">
      <Flex className="relative">
        {
          !session &&
          <Flex direction="row" noFullWidth className="absolute bottom-5 right-5 z-10 justify-end gap-5">
            <FlexLink href="/account/register" center className="button-clickable-bg w-20 p-2">
              註冊
            </FlexLink>
            <FlexLink href="/account/login" center className="button-clickable-border w-20 p-2">
              登入
            </FlexLink>
          </Flex>
        }
        <div className="relative h-60 sm:h-96 xl:h-[30rem]">
          <NextImage src="/banner.png" alt="Banner" className="rounded-lg bg-black object-cover"/>
        </div>
      </Flex>
      <Grid center className={clsx(
        'grid-cols-1 gap-3 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 p-4 md:grid-cols-4',
      )}>
        <HomeStatsSection icon={<RocketLaunchIcon/>} value={100} title="已交易 NFT 數量"/>
        <HomeStatsSection icon={<UsdtIcon/>} value={9E6} title="24 小時 USDT 交易量"/>
        <HomeStatsSection icon={<CurrencyDollarIcon/>} value={2.7E7} title="24 小時 GOLD 購買量"/>
        <HomeStatsSection icon={<BanknotesIcon/>} value={parseFloat(currentFx ?? '-')} title="USDT / TWD"/>
      </Grid>
    </Flex>
  );
};
