'use client';
import React from 'react';

import {passwordPattern, usernamePattern} from '@spinach/common/const/auth';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {signIn} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexForm} from '@spinach/next/components/layout/flex/form';
import {FlexLink} from '@spinach/next/components/layout/flex/link';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {InputFloatingLabel} from '@spinach/next/components/shared/common/input/field';
import {useI18nApiErrorTranslator} from '@spinach/next/hooks/i18n/apiError/main';
import {AccountLoginInput} from '@spinach/next/ui/account/login/type';


type Props = {
  error: ApiErrorCode | undefined,
};

export const AccountLoginClient = ({error}: Props) => {
  const [input, setInput] = React.useState<AccountLoginInput>({
    username: '',
    password: '',
  });
  const {username, password} = input;

  const t = useTranslations('UI.UserControl');

  const translateApiError = useI18nApiErrorTranslator();

  return (
    <Flex className="gap-2 self-center text-xl md:px-7">
      {error && <Alert>{translateApiError(error)}</Alert>}
      <FlexForm className="gap-2" onSubmit={async () => (
        signIn('Spinach', {username, password})
      )}>
        <InputFloatingLabel
          id="username"
          placeholder={t('Credentials.Account')}
          type="text"
          value={username}
          onChange={({target}) => setInput((original) => ({
            ...original,
            username: target.value,
          } satisfies AccountLoginInput))}
          autoComplete="username"
          required
          pattern={usernamePattern}
        />
        <InputFloatingLabel
          id="password"
          placeholder={t('Credentials.Password')}
          type="password"
          value={password}
          onChange={({target}) => setInput((original) => ({
            ...original,
            password: target.value,
          } satisfies AccountLoginInput))}
          autoComplete="current-password"
          required
          pattern={passwordPattern}
        />
        <Flex className="gap-2">
          <button type="submit" className="button-clickable-bg w-full p-2">
            {t('Login')}
          </button>
          <FlexLink href="/account/register" center className="button-clickable-border p-2">
            {t('Register')}
          </FlexLink>
        </Flex>
      </FlexForm>
    </Flex>
  );
};
