'use client';
import React from 'react';

import {passwordPattern, usernamePattern} from '@spinach/common/const/auth';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {translateApiError} from '@spinach/common/utils/translate/apiError';
import {signIn} from 'next-auth/react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexForm} from '@spinach/next/components/layout/flex/form';
import {FlexLink} from '@spinach/next/components/layout/flex/link';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {InputFloatingLabel} from '@spinach/next/components/shared/common/input/field';
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

  return (
    <Flex className="gap-2 self-center text-xl md:px-7">
      {error && <Alert>{translateApiError(error)}</Alert>}
      <FlexForm className="gap-2" onSubmit={async () => (
        signIn('Spinach', {username, password})
      )}>
        <InputFloatingLabel
          id="username"
          placeholder="帳號"
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
          placeholder="密碼"
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
            登入
          </button>
          <FlexLink href="/account/register" className="button-clickable-border w-full p-2 text-center">
            註冊
          </FlexLink>
        </Flex>
      </FlexForm>
    </Flex>
  );
};
