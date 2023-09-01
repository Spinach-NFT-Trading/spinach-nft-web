'use client';
import React from 'react';

import {ApiErrorCode} from '@spinach/common/types/api/error';
import {translateApiError} from '@spinach/common/utils/translate/apiError';

import {Flex} from '@spinach/next/components/layout/flex';
import {Grid} from '@spinach/next/components/layout/grid';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {AccountRegisterForm} from '@spinach/next/ui/account/register/form';
import {AccountRegisterInstruction} from '@spinach/next/ui/account/register/instruction';


export const AccountRegisterClient = () => {
  const [error, setError] = React.useState<ApiErrorCode | null>(null);

  return (
    <Flex direction="col" className="gap-3 md:p-10">
      {error && <Alert>{translateApiError(error)}</Alert>}
      <Grid className="grid-cols-1 gap-3 md:grid-cols-2">
        <AccountRegisterForm setError={setError}/>
        <AccountRegisterInstruction/>
      </Grid>
    </Flex>
  );
};
