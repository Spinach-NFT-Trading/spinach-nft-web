'use client';
import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {UserDataLazyLoad} from '@spinach/next/components/shared/userData/lazyLoad';
import {AdminDataSearchInputUi} from '@spinach/next/ui/admin/input/main';
import {adminVerifyIdSearchKeyI18nId} from '@spinach/next/ui/admin/verify/id/const';
import {AdminVerifyIdResults} from '@spinach/next/ui/admin/verify/id/result';
import {adminVerifyIdFilterBasis, AdminVerifyIdFilterInput} from '@spinach/next/ui/admin/verify/id/type';


export const AdminVerifyId = () => {
  const [input, setInput] = React.useState<AdminVerifyIdFilterInput>({
    key: 'username',
    value: '',
  });

  const t = useTranslations('UI.InPage.Admin.VerifyInfo');

  return (
    <Flex className="gap-2">
      <div className="text-2xl">{t('Title.PendingAccount')}</div>
      <AdminDataSearchInputUi
        input={input}
        setInput={setInput}
        availableSearchKeys={[...adminVerifyIdFilterBasis]}
        getSearchKeyName={(key) => t(adminVerifyIdSearchKeyI18nId[key])}
      />
      <UserDataLazyLoad
        options={{
          type: 'adminUnverifiedAccounts',
        }}
        loadingText={t('Title.PendingAccount')}
        content={(data) => {
          const response = data?.adminUnverifiedAccounts;

          if (!response) {
            return null;
          }

          return <AdminVerifyIdResults data={response} input={input}/>;
        }}
      />
    </Flex>
  );
};
