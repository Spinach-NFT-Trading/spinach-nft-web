import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';


export const NftPositionLimitedProofRedirect = () => {
  const t = useTranslations('UI.InPage.NftPosition.LimitedProof');

  return (
    <Flex center className="p-4">
      <div className="rounded-lg border border-green-500 bg-green-50 p-6">
        <h2 className="mb-2 text-xl font-semibold text-green-700">
          {t('Success')}
        </h2>
        <p className="text-gray-700">{t('Redirecting')}</p>
      </div>
    </Flex>
  );
};
