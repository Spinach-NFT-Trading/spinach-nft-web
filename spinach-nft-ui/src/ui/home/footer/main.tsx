import React from 'react';

import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import ScaleIcon from '@heroicons/react/24/outline/ScaleIcon';
import ShieldCheckIcon from '@heroicons/react/24/outline/ShieldCheckIcon';
import TrophyIcon from '@heroicons/react/24/outline/TrophyIcon';
import clsx from 'clsx';

import {Grid} from '@spinach/next/components/layout/grid';
import {HomeFooterIntroSection} from '@spinach/next/ui/home/footer/introSection';
import {HomeFooterSocial} from '@spinach/next/ui/home/footer/social';


export const HomeFooter = () => {
  return (
    <>
      <Grid center className={clsx(
        'info-section-base grid-cols-1 grid-rows-4 gap-4 md:grid-cols-4 md:grid-rows-1',
        'bg-gradient-to-br from-slate-200/80 to-slate-100/60 text-black',
      )}>
        <HomeFooterIntroSection
          icon={<TrophyIcon/>}
          title="用戶成長體系"
          description="台灣首創，結合遊戲業常用的用戶成長體系納入交易所，積極互動即可享好康"
        />
        <HomeFooterIntroSection
          icon={<ShieldCheckIcon/>}
          title="安全優先"
          description="採國際級 DDoS 防禦機制及 AI 應用程式防火牆，最大化保護用戶資產"
        />
        <HomeFooterIntroSection
          icon={<ScaleIcon/>}
          title="合法合規"
          description="以金融機構最高標準開發產品及營運流程，恪守 KYC、AML 規範"
        />
        <HomeFooterIntroSection
          icon={<PencilSquareIcon/>}
          title="量身訂製數位產品"
          description="配置風險等級框架及客製化投資組合，提供量身打造的金融產品和購買 / 提款限額"
        />
      </Grid>
      <HomeFooterSocial/>
    </>
  );
};
