'use client';
import React from 'react';

import {bankAccountPattern, bankCodePattern} from '@spinach/common/const/auth';
import {clsx} from 'clsx';
import {useRouter} from 'next/navigation';
import {signIn} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {AnimatedCollapse} from '@spinach/next/components/layout/collapsible/animated';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexForm} from '@spinach/next/components/layout/flex/form';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {InputFloatingLabel} from '@spinach/next/components/shared/common/input/field';
import {InputFileImageOnly} from '@spinach/next/components/shared/common/input/file/image';
import {useI18nApiErrorTranslator} from '@spinach/next/hooks/i18n/apiError/main';
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
        status: 'unverified',
      },
    },
  });
  const {act, status} = useUserDataActor();
  const {replace} = useRouter();

  const t = useTranslations('UI.InPage.Account.Bank');
  const t2 = useTranslations('UI.Error.Input');

  const translateApiError = useI18nApiErrorTranslator();

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
        errorMessage: t('Error.MissingBankbookPhoto'),
      }));
      return;
    }

    const session = await act({
      action: 'request',
      options: {
        type: 'user.bank',
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
            title={t('InputField.BankbookPhoto')}
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
              errorMessage: t2('IncorrectFileType', {type}),
            } satisfies AccountAddBankState))}
            required
          />
          <InputFloatingLabel
            id="code"
            type="text"
            placeholder={t('InputField.BankCode')}
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
            placeholder={t('InputField.BankAccount')}
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
          {uploading ? t('Uploading') : t('Upload')}
        </button>
      </FlexForm>
    </AnimatedCollapse>
  );
};
