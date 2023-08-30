import React from 'react';

import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import RocketLaunchIcon from '@heroicons/react/24/outline/RocketLaunchIcon';
import Link from 'next/link';

import {UsdtIcon} from '@spinach/next/components/icons/usdt';
import {Flex} from '@spinach/next/components/layout/flex';
import {Grid} from '@spinach/next/components/layout/grid';
import {NextImage} from '@spinach/next/components/shared/common/image';
import {HomeStatsSection} from '@spinach/next/ui/home/stats';


export const HomeHeader = () => {
  return (
    <Flex direction="col" className="gap-2">
      <Flex direction="col" className="relative">
        <Flex direction="row" noFullWidth className="absolute bottom-5 right-5 z-10 justify-end gap-5">
          <Link href="/account/register" className="button-clickable-bg w-20 p-2 text-center">
            註冊
          </Link>
          <Link href="/account/login" className="button-clickable-border w-20 p-2 text-center">
            登入
          </Link>
        </Flex>
        <div className="relative h-60 sm:h-96 xl:h-[30rem]">
          <NextImage src="/banner.png" alt="Banner" className="rounded-lg bg-black object-cover"/>
        </div>
      </Flex>
      <Grid center className="info-section grid-cols-1 gap-3 md:grid-cols-3">
        <HomeStatsSection icon={<RocketLaunchIcon/>} value={100} title="已交易 NFT 數量"/>
        <HomeStatsSection icon={<UsdtIcon/>} value={9E6} title="24 小時 USDT 交易量"/>
        <HomeStatsSection icon={<CurrencyDollarIcon/>} value={2.7E7} title="24 小時 GOLD 購買量"/>
      </Grid>
    </Flex>
  );
};
