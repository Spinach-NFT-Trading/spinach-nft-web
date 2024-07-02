import React from 'react';

import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import ScaleIcon from '@heroicons/react/24/outline/ScaleIcon';
import ShieldCheckIcon from '@heroicons/react/24/outline/ShieldCheckIcon';
import TrophyIcon from '@heroicons/react/24/outline/TrophyIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Grid} from '@spinach/next/components/layout/grid';
import {HomeFooterIntroSection} from '@spinach/next/ui/home/footer/introSection';
import {HomeFooterSocial} from '@spinach/next/ui/home/footer/social';


export const HomeFooter = () => {
  const t = useTranslations('UI.InPage.Home.Pledge');

  return (
    <>
      <Grid center className={clsx(
        'info-section-base grid-cols-1 grid-rows-4 gap-4 md:grid-cols-4 md:grid-rows-1',
        'bg-gradient-to-br from-slate-200/80 to-slate-100/60 text-black',
      )}>
        <HomeFooterIntroSection
          icon={<TrophyIcon/>}
          title={t('System.Title')}
          description={t('System.Content')}
        />
        <HomeFooterIntroSection
          icon={<ShieldCheckIcon/>}
          title={t('Security.Title')}
          description={t('Security.Content')}
        />
        <HomeFooterIntroSection
          icon={<ScaleIcon/>}
          title={t('Legitimacy.Title')}
          description={t('Legitimacy.Content')}
        />
        <HomeFooterIntroSection
          icon={<PencilSquareIcon/>}
          title={t('Customize.Title')}
          description={t('Customize.Content')}
        />
      </Grid>
      <HomeFooterSocial/>
    </>
  );
};
