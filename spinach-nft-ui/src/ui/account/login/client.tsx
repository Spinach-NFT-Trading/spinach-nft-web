'use client';
import React from 'react';

import {useSearchParams} from 'next/navigation';
import {signIn} from 'next-auth/react';
import {translateAuthError} from 'spinach-nft-common/utils/translate/authError';

import {Flex} from '@/components/layout/flex';
import {Alert} from '@/components/shared/common/alert';
import {InputFloatingLabel} from '@/components/shared/common/input/field';
import {AccountLoginInput} from '@/ui/account/login/type';


export const AccountLoginClient = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const [input, setInput] = React.useState<AccountLoginInput>({
    username: '',
    password: '',
  });
  const {username, password} = input;

  return (
    <Flex direction="col" className="gap-2 md:p-10">
      <Flex direction="col" className="info-section gap-2 self-center md:w-1/2">
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
            id="account"
            placeholder="帳號"
            type="text"
            value={username}
            onChange={({target}) => setInput((original) => ({
              ...original,
              username: target.value,
            } satisfies AccountLoginInput))}
            autoComplete="username"
            required
            pattern="[a-zA-Z0-9]{6,}"
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
            pattern="[a-zA-Z0-9]{6,}"
          />
          <Flex direction="row" className="gap-2">
            <button className="button-clickable-bg w-full p-2">
              註冊
            </button>
            <button type="submit" className="button-clickable-bg w-full p-2">
              登入
            </button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};
