import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex';
import {Grid} from '@spinach/next/components/layout/grid';
import {NextImage} from '@spinach/next/components/shared/common/image/main';
import {HomeSocialButton} from '@spinach/next/ui/home/footer/socialButton';


export const HomeFooterSocial = () => {
  return (
    <Flex className="relative">
      <Grid noFullWidth center className="absolute right-5 z-10 h-full">
        <Grid className="grid-rows-4 gap-4">
          <HomeSocialButton href="#" text="LINE"/>
          <HomeSocialButton href="#" text="Telegram"/>
          <HomeSocialButton href="#" text="Twitter"/>
          <HomeSocialButton href="#" text="Facebook"/>
        </Grid>
      </Grid>
      <div className="relative h-64 sm:h-96 xl:h-[30rem]">
        <NextImage src="/social.png" alt="Banner" className="rounded-lg bg-black object-cover object-left"/>
      </div>
    </Flex>
  );
};
