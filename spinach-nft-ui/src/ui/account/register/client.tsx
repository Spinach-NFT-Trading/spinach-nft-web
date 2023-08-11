'use client';
import React from 'react';

import {signIn} from 'next-auth/react';
import {
  lineIdPattern,
  namePattern,
  passwordPattern,
  phonePattern,
  usernamePattern,
  walletPattern,
} from 'spinach-nft-common/const/auth';
import {apiPath} from 'spinach-nft-common/const/path';
import {AuthErrorCode} from 'spinach-nft-common/types/api/auth/error';
import {UserRegisterResponse} from 'spinach-nft-common/types/api/auth/register';
import {translateAuthError} from 'spinach-nft-common/utils/translate/authError';

import {Flex} from '@/components/layout/flex';
import {Alert} from '@/components/shared/common/alert';
import {InputFloatingLabel} from '@/components/shared/common/input/field';
import {AccountRegisterInput} from '@/ui/account/register/type';
import {sendApiPost} from '@/utils/api';


export const AccountRegisterClient = () => {
  const [error, setError] = React.useState<AuthErrorCode | null>(null);
  const [input, setInput] = React.useState<AccountRegisterInput>({
    name: '',
    email: '',
    lineId: '',
    phone: '',
    wallet: '',
    username: '',
    password: '',
  });

  const {name, email, lineId, phone, wallet, username, password} = input;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await sendApiPost<UserRegisterResponse>({
      path: apiPath.auth.register,
      data: input,
    });

    if (response.success) {
      await signIn('Spinach', {username, password});
      return;
    }

    setError(response.error);
  };

  return (
    <Flex direction="col" className="gap-2 md:p-10">
      <Flex direction="col" className="gap-2 self-center md:w-1/2">
        {
          error &&
          <Alert>
            {translateAuthError(error)}
          </Alert>
        }
        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
          <InputFloatingLabel
            id="name"
            placeholder="姓名"
            type="text"
            value={name}
            onChange={({target}) => setInput((original) => ({
              ...original,
              name: target.value,
            } satisfies AccountRegisterInput))}
            autoComplete="name"
            required
            pattern={namePattern}
          />
          <InputFloatingLabel
            id="email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={({target}) => setInput((original) => ({
              ...original,
              email: target.value,
            } satisfies AccountRegisterInput))}
            autoComplete="email"
            required
          />
          <InputFloatingLabel
            id="lineId"
            placeholder="LINE ID"
            type="text"
            value={lineId}
            onChange={({target}) => setInput((original) => ({
              ...original,
              lineId: target.value,
            } satisfies AccountRegisterInput))}
            required
            pattern={lineIdPattern}
          />
          <InputFloatingLabel
            id="phone"
            placeholder="手機號碼"
            type="text"
            value={phone}
            onChange={({target}) => setInput((original) => ({
              ...original,
              phone: target.value,
            } satisfies AccountRegisterInput))}
            required
            pattern={phonePattern}
          />
          <InputFloatingLabel
            id="wallet"
            placeholder="MAX 錢包地址 (TRC20)"
            type="text"
            value={wallet}
            onChange={({target}) => setInput((original) => ({
              ...original,
              wallet: target.value,
            } satisfies AccountRegisterInput))}
            required
            pattern={walletPattern}
          />
          <InputFloatingLabel
            id="username"
            placeholder="帳號"
            type="text"
            value={username}
            onChange={({target}) => setInput((original) => ({
              ...original,
              username: target.value,
            } satisfies AccountRegisterInput))}
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
            } satisfies AccountRegisterInput))}
            autoComplete="new-password"
            required
            pattern={passwordPattern}
          />
          <Flex direction="row" className="justify-end gap-2">
            <button type="submit" className="button-clickable-bg w-1/3 p-2">
              註冊
            </button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};
