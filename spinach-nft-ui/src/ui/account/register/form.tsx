import React from 'react';

import {
  lineIdPattern,
  namePattern,
  passwordPattern,
  usernamePattern,
  walletPattern,
} from '@spinach/common/const/auth';
import {apiPath} from '@spinach/common/const/path';
import {UserRegisterResponse} from '@spinach/common/types/api/auth/register';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {signIn} from 'next-auth/react';

import {InputFloatingLabel} from '@spinach/next/components/shared/common/input/field';
import {AccountRegisterInput} from '@spinach/next/ui/account/register/type';
import {sendApiPost} from '@spinach/next/utils/api/common';


type Props = {
  setError: (error: ApiErrorCode) => void,
};

export const AccountRegisterForm = ({setError}: Props) => {
  const [input, setInput] = React.useState<AccountRegisterInput>({
    name: '',
    email: '',
    lineId: '',
    wallet: '',
    username: '',
    password: '',
  });

  const {name, email, lineId, wallet, username, password} = input;

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
      <button type="submit" className="button-clickable-bg w-full p-2">
        註冊
      </button>
    </form>
  );
};
