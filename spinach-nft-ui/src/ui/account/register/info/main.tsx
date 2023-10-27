import React from 'react';

import {
  lineIdPattern,
  namePattern,
  passwordPattern,
  usernamePattern,
  walletPattern,
} from '@spinach/common/const/auth';
import {IsoDateString} from '@spinach/common/types/common/date';

import {AnimatedCollapse} from '@spinach/next/components/layout/collapsible/animated';
import {FlexForm} from '@spinach/next/components/layout/flex/form';
import {InputFloatingLabel} from '@spinach/next/components/shared/common/input/field';
import {AccountRegisterCommonProps, AccountRegisterInput} from '@spinach/next/ui/account/register/type';


export const AccountRegisterBasicInfo = ({show, input, setInput, onComplete}: AccountRegisterCommonProps) => {
  const {
    name,
    email,
    birthday,
    lineId,
    wallet,
    username,
    password,
  } = input;

  return (
    <AnimatedCollapse show={show}>
      <FlexForm className="gap-2" onSubmit={onComplete}>
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
          id="birthday"
          placeholder="生日"
          type="date"
          value={birthday}
          onChange={({target}) => setInput((original) => ({
            ...original,
            birthday: target.value as IsoDateString,
          } satisfies AccountRegisterInput))}
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
          下一步
        </button>
      </FlexForm>
    </AnimatedCollapse>
  );
};
