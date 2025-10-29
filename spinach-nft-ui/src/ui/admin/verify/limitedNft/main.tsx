'use client';
import React from 'react';

import {useSession} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {Loading} from '@spinach/next/components/icons/loading';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {AdminDataSearchInputUi} from '@spinach/next/ui/admin/input/main';
import {getAdminVerifyLimitedNftData} from '@spinach/next/ui/admin/verify/limitedNft/action';
import {adminVerifyLimitedNftSearchKeyName} from '@spinach/next/ui/admin/verify/limitedNft/const';
import {AdminVerifyLimitedNftResults} from '@spinach/next/ui/admin/verify/limitedNft/result';
import {
  AdminVerifyLimitedNftData,
  adminVerifyLimitedNftFilterBasis,
  AdminVerifyLimitedNftFilterInput,
} from '@spinach/next/ui/admin/verify/limitedNft/type';


export const AdminVerifyLimitedNft = () => {
  const {data: session} = useSession();
  const [input, setInput] = React.useState<AdminVerifyLimitedNftFilterInput>({
    key: 'username',
    value: '',
  });
  const [data, setData] = React.useState<AdminVerifyLimitedNftData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const t = useTranslations('UI.InPage.Admin.VerifyInfo');

  React.useEffect(() => {
    if (!session?.user?.id) {
      return;
    }

    setIsLoading(true);
    getAdminVerifyLimitedNftData({executorUserId: session.user.id})
      .then(setData)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loading text={t('Title.LimitedNft')}/>;
  }

  if (!data) {
    return null;
  }

  return (
    <Flex className="gap-2">
      <div className="text-2xl">{t('Title.LimitedNft')}</div>
      <AdminDataSearchInputUi
        input={input}
        setInput={setInput}
        availableSearchKeys={[...adminVerifyLimitedNftFilterBasis]}
        getSearchKeyName={(key) => t(adminVerifyLimitedNftSearchKeyName[key])}
      />
      <AdminVerifyLimitedNftResults data={data} input={input}/>
    </Flex>
  );
};
