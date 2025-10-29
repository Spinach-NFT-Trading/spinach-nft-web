import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {NextImage} from '@spinach/next/components/shared/common/image/main';
import {HomeSocialButton} from '@spinach/next/ui/home/footer/socialButton';


export const HomeFooterSocial = () => {
  return (
    <Flex className="relative">
      <Flex noFullWidth className="absolute bottom-0 right-5 z-10 h-fit gap-4">
        <HomeSocialButton href="https://lin.ee/ycjqYCe" text="LINE"/>
        <HomeSocialButton href="https://t.me/ttgg6868" text="Telegram"/>
      </Flex>
      <div className="relative h-64 sm:h-96 xl:h-[30rem]">
        <NextImage src="/social.png" alt="Banner" className="rounded-lg bg-black object-cover object-left"/>
      </div>
    </Flex>
  );
};
