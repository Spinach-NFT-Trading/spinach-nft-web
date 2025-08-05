import React from 'react';

import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon';
import RocketLaunchIcon from '@heroicons/react/24/outline/RocketLaunchIcon';
import {clsx} from 'clsx';
import {Session} from 'next-auth';
import {useTranslations} from 'next-intl';

import {UsdtIcon} from '@spinach/next/components/icons/usdt';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexLink} from '@spinach/next/components/layout/flex/link';
import {Grid} from '@spinach/next/components/layout/grid';
import {NextImage} from '@spinach/next/components/shared/common/image/main';
import {HomeStatsSection} from '@spinach/next/ui/home/stats';


type Props = {
  session: Session | null,
};

export const HomeHeader = ({session}: Props) => {
  const t = useTranslations('UI.InPage.Home.Stats');
  const t2 = useTranslations('UI.UserControl');

  return (
    <Flex className="gap-2">
      <Flex className="relative">
        {
          !session &&
          <Flex direction="row" noFullWidth className="absolute bottom-5 right-5 z-10 justify-end gap-5">
            <FlexLink href="/account/register" center className="button-clickable-bg w-20 p-2">
              {t2('Register')}
            </FlexLink>
            <FlexLink href="/account/login" center className="button-clickable-border w-20 p-2">
              {t2('Login')}
            </FlexLink>
          </Flex>
        }
        <div className="relative h-60 sm:h-96 xl:h-[30rem]">
          <NextImage src="/banner.png" alt="Banner" className="rounded-lg bg-black object-cover"/>
        </div>
      </Flex>
      <Grid center className={clsx(
        'grid-cols-1 gap-3 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 p-4 md:grid-cols-3',
      )}>
        <HomeStatsSection icon={<RocketLaunchIcon/>} value={100} title={t('NftVolume')}/>
        <HomeStatsSection icon={<UsdtIcon/>} value={9E6} title={t('UsdtVolume')}/>
        <HomeStatsSection icon={<CurrencyDollarIcon/>} value={2.7E7} title={t('GoldVolume')}/>
      </Grid>
    </Flex>
  );
};
