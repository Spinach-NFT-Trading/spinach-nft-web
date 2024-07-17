'use client';
import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';
import {AdminDataSearchInputUi} from '@spinach/next/ui/admin/input/main';
import {adminVerifyBankSearchKeyI18nId} from '@spinach/next/ui/admin/verify/bank/const';
import {AdminVerifyBankResults} from '@spinach/next/ui/admin/verify/bank/result';
import {adminVerifyBankFilterBasis, AdminVerifyBankFilterInput} from '@spinach/next/ui/admin/verify/bank/type';


export const AdminVerifyBank = () => {
  const [input, setInput] = React.useState<AdminVerifyBankFilterInput>({
    key: 'username',
    value: '',
  });

  const t = useTranslations('UI.InPage.Admin.VerifyInfo');

  return (
    <Flex className="gap-2">
      <div className="text-2xl">{t('Title.Bank')}</div>
      <AdminDataSearchInputUi
        input={input}
        setInput={setInput}
        availableSearchKeys={[...adminVerifyBankFilterBasis]}
        getSearchKeyName={(key) => t(adminVerifyBankSearchKeyI18nId[key])}
      />
      <UserDataLazyLoad
        options={{
          type: 'adminUnverifiedBankDetails',
        }}
        loadingText={t('Title.Bank')}
        content={(data) => {
          const response = data?.adminUnverifiedBankDetails;

          if (!response) {
            return null;
          }

          return <AdminVerifyBankResults data={response} input={input}/>;
        }}
      />
    </Flex>
  );
};
