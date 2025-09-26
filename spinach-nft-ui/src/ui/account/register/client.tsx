'use client';
import React from 'react';

import {ApiErrorCode} from '@spinach/common/types/api/error';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {useI18nApiErrorTranslator} from '@spinach/next/hooks/i18n/apiError/main';
import {AccountRegisterForm} from '@spinach/next/ui/account/register/form';


export const AccountRegisterClient = () => {
  const [error, setError] = React.useState<ApiErrorCode | null>(null);

  const translateApiError = useI18nApiErrorTranslator();

  return (
    <Flex className="gap-3 text-xl md:px-7">
      {error && <Alert>{translateApiError(error)}</Alert>}
      <AccountRegisterForm setError={setError}/>
    </Flex>
  );
};
