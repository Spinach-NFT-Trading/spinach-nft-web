'use client';
import React from 'react';

import {passwordPattern, usernamePattern} from '@spinach/common/const/auth';
import {AuthErrorCode} from '@spinach/common/types/api/auth/error';
import {translateAuthError} from '@spinach/common/utils/translate/authError';
import Link from 'next/link';
import {signIn} from 'next-auth/react';

import {Flex} from '@spinach/next/components/layout/flex';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {InputFloatingLabel} from '@spinach/next/components/shared/common/input/field';
import {AccountLoginInput} from '@spinach/next/ui/account/login/type';


type Props = {
  error: AuthErrorCode | undefined,
};

export const AccountLoginClient = ({error}: Props) => {
  const [input, setInput] = React.useState<AccountLoginInput>({
    username: '',
    password: '',
  });
  const {username, password} = input;

  return (
    <Flex direction="col" className="gap-2 md:p-10">
      <Flex direction="col" className="gap-2 self-center md:w-1/2">
        {
          error &&
          <Alert>
            {translateAuthError(error)}
          </Alert>
        }
        <form className="flex flex-col gap-2" onSubmit={async (e) => {
          e.preventDefault();
          await signIn('Spinach', {username, password});
        }}>
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
          <Flex direction="row" className="gap-2">
            <Link href="/account/register" className="button-clickable-bg w-full p-2 text-center">
              註冊
            </Link>
            <button type="submit" className="button-clickable-bg w-full p-2">
              登入
            </button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};
