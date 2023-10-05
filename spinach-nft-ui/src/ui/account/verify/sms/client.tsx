'use client';
import React from 'react';

import {phonePattern} from '@spinach/common/const/auth';
import {apiPath} from '@spinach/common/const/path';
import {AccountVerifySmsCodeResponse} from '@spinach/common/types/api/account/verify/sms';

import {SignIn} from '@spinach/next/components/auth/signIn';
import {AnimatedCollapse} from '@spinach/next/components/layout/collapsible/animated';
import {Flex} from '@spinach/next/components/layout/flex';
import {InputFloatingLabel} from '@spinach/next/components/shared/common/input/field';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {AccountVerifySmsInput, AccountVerifySmsState} from '@spinach/next/ui/account/verify/sms/type';
import {sendApiPost} from '@spinach/next/utils/api';


export const AccountVerifySmsClient = () => {
  const [input, setInput] = React.useState<AccountVerifySmsState>({
    phone: '',
    requested: false,
    code: '',
    error: null,
  });
  const {act} = useUserDataActor();

  const {phone, requested, code} = input;

  if (!act) {
    return <SignIn/>;
  }

  const onPhoneSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    act({action: 'request', options: {type: 'nftBuy', data: {nftId}}});
    // FIXME: use next auth actor
    setInput((original) => ({...original, requested: true}));
  };

  const onCodeSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // FIXME: use next auth actor
    const response = await sendApiPost<AccountVerifySmsCodeResponse>({
      path: apiPath.account.smsVerify,
      data: input,
    });

    if (!response.success) {
      setInput((original) => ({...original, error: response.error}));
    }
  };

  return (
    <Flex direction="col" className="gap-2 md:p-10">
      <form className="flex flex-col gap-2 self-center md:w-1/2" onSubmit={onPhoneSubmitted}>
        <InputFloatingLabel
          id="phone"
          placeholder="手機號碼"
          type="tel"
          value={phone}
          onChange={({target}) => setInput((original) => ({
            ...original,
            phone: target.value,
          } satisfies AccountVerifySmsInput))}
          autoComplete="tel"
          required
          pattern={phonePattern}
        />
        <button type="submit" className="button-clickable-bg w-full p-2">
          獲取驗證碼
        </button>
      </form>
      <form className="flex self-center md:w-1/2" onSubmit={onCodeSubmitted}>
        <AnimatedCollapse show={requested} className="flex flex-col gap-2">
          <InputFloatingLabel
            id="code"
            placeholder="驗證碼"
            type="text"
            value={code}
            onChange={({target}) => setInput((original) => ({
              ...original,
              code: target.value,
            } satisfies AccountVerifySmsInput))}
            required
          />
          <button type="submit" className="button-clickable-bg w-full p-2">
            驗證手機
          </button>
        </AnimatedCollapse>
      </form>
    </Flex>
  );
};
