'use client';
import React from 'react';

import {bankAccountPattern, bankCodePattern} from '@spinach/common/const/auth';
import {translateApiError} from '@spinach/common/utils/translate/apiError';
import clsx from 'clsx';
import {useRouter} from 'next/navigation';
import {signIn} from 'next-auth/react';

import {AnimatedCollapse} from '@spinach/next/components/layout/collapsible/animated';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexForm} from '@spinach/next/components/layout/flex/form';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {InputFloatingLabel} from '@spinach/next/components/shared/common/input/field';
import {InputFileImageOnly} from '@spinach/next/components/shared/common/input/file/image';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {AccountAddBankState} from '@spinach/next/ui/account/bank/type';


export const AccountAddBankClient = () => {
  const [state, setState] = React.useState<AccountAddBankState>({
    errorMessage: null,
    data: {
      image: null,
      details: {
        code: '',
        account: '',
        verified: false,
      },
    },
  });
  const {act, status} = useUserDataActor();
  const {replace} = useRouter();

  const {errorMessage, data} = state;
  const {image, details} = data;
  const uploading = status === 'processing';

  const onSubmit = async () => {
    if (!act) {
      await signIn();
      return;
    }

    if (!data.image) {
      setState((original) => ({
        ...original,
        errorMessage: '請附上存摺照片。',
      }));
      return;
    }

    const session = await act({
      action: 'request',
      options: {
        type: 'userBankDetails',
        data: {
          details: data.details,
          image: data.image,
        },
      },
    });
    const error = session?.user.jwtUpdateError;
    if (!error) {
      replace('/account/profile');
      return;
    }

    setState((original) => ({
      ...original,
      errorMessage: translateApiError(error),
    }));
  };

  return (
    <AnimatedCollapse show appear>
      <FlexForm className="gap-2" onSubmit={onSubmit}>
        {errorMessage && <Alert>{translateApiError(errorMessage)}</Alert>}
        <Flex className="gap-2 lg:flex-row">
          <InputFileImageOnly
            id="note"
            title="銀行存摺照片"
            className={clsx(errorMessage && 'text-red-400')}
            onFileSelected={(image) => setState((original) => ({
              ...original,
              data: {
                ...original.data,
                image,
              },
            } satisfies AccountAddBankState))}
            onFileTypeIncorrect={(type) => setState((original) => ({
              ...original,
              errorMessage: `檔案種類不正確: ${type}`,
            } satisfies AccountAddBankState))}
            required
          />
          <InputFloatingLabel
            id="code"
            type="text"
            placeholder="銀行代碼"
            value={details.code}
            onChange={({target}) => setState((original) => ({
              ...original,
              data: {
                ...original.data,
                details: {
                  ...original.data.details,
                  code: target.value,
                },
              },
            } satisfies AccountAddBankState))}
            pattern={bankCodePattern}
            wrapperClassName="w-full"
            required
          />
          <InputFloatingLabel
            id="code"
            type="text"
            placeholder="銀行帳號"
            value={details.account}
            onChange={({target}) => setState((original) => ({
              ...original,
              data: {
                ...original.data,
                details: {
                  ...original.data.details,
                  account: target.value,
                },
              },
            } satisfies AccountAddBankState))}
            pattern={bankAccountPattern}
            wrapperClassName="w-full"
            required
          />
        </Flex>
        <button
          type="submit" className="enabled:button-clickable-bg disabled:button-disabled w-full p-2"
          disabled={uploading || !image || !details.account || !details.code}
        >
          {uploading ? '上傳中...' : '上傳'}
        </button>
      </FlexForm>
    </AnimatedCollapse>
  );
};
