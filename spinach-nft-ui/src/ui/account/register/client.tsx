'use client';
import React from 'react';

import {ApiErrorCode} from '@spinach/common/types/api/error';
import {translateApiError} from '@spinach/common/utils/translate/apiError';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {AccountRegisterForm} from '@spinach/next/ui/account/register/form';
import {AccountRegisterSearchParams} from '@spinach/next/ui/account/register/type';


export const AccountRegisterClient = (props: AccountRegisterSearchParams) => {
  const [error, setError] = React.useState<ApiErrorCode | null>(null);

  return (
    <Flex className="gap-3 text-xl md:px-7">
      {error && <Alert>{translateApiError(error)}</Alert>}
      <AccountRegisterForm setError={setError} {...props}/>
    </Flex>
  );
};
