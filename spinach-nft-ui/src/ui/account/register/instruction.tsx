import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexLink} from '@spinach/next/components/layout/flex/link';
import {NextImage} from '@spinach/next/components/shared/common/image/main';


export const AccountRegisterInstruction = () => {
  const t = useTranslations('UI.InPage.Account.Register');

  return (
    <Flex center className="justify-between gap-3">
      <div className="relative size-72">
        <NextImage src="/line-qr.png" alt="LINE"/>
      </div>
      <div className="text-left">
        {t('Completed.Message')}
      </div>
      <FlexLink href="#" noFullWidth={false} center className="button-clickable-bg p-2">
        {t('Completed.KYC')}
      </FlexLink>
    </Flex>
  );
};
