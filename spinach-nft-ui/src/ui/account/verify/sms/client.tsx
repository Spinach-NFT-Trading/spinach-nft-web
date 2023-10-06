'use client';
import React from 'react';

import {phonePattern} from '@spinach/common/const/auth';
import {translateApiError} from '@spinach/common/utils/translate/apiError';
import {redirect} from 'next/navigation';

import {SignIn} from '@spinach/next/components/auth/signIn';
import {AnimatedCollapse} from '@spinach/next/components/layout/collapsible/animated';
import {Flex} from '@spinach/next/components/layout/flex';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {InputFloatingLabel} from '@spinach/next/components/shared/common/input/field';
import {useUserDataActor} from '@spinach/next/hooks/userData/actor';
import {AccountVerifySmsInput, AccountVerifySmsState} from '@spinach/next/ui/account/verify/sms/type';


export const AccountVerifySmsClient = () => {
  const [input, setInput] = React.useState<AccountVerifySmsState>({
    phone: '',
    requested: false,
    code: '',
    loading: false,
    error: null,
  });
  const {act} = useUserDataActor();

  const {
    phone,
    requested,
    code,
    loading,
    error,
  } = input;

  if (!act) {
    return <SignIn/>;
  }

  const onPhoneSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput((original) => ({...original, loading: true}));
    await act({action: 'request', options: {type: 'verify.sms.phone', data: input.phone}});
    setInput((original) => ({...original, loading: false, requested: true}));
  };

  const onCodeSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput((original) => ({...original, loading: true}));
    const session = await act({action: 'request', options: {type: 'verify.sms.code', data: input.code}});

    const error = session?.user.jwtUpdateError;
    if (error) {
      setInput((original) => ({...original, error}));
    }
    redirect('/account/profile');
  };

  return (
    <Flex direction="col" className="gap-2 md:p-10">
      {error && <Alert>{translateApiError(error)}</Alert>}
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
        <button type="submit" disabled={loading} className="button-clickable-bg disabled:button-disabled w-full p-2">
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
          <button type="submit" disabled={loading} className="button-clickable-bg disabled:button-disabled w-full p-2">
            驗證手機
          </button>
        </AnimatedCollapse>
      </form>
    </Flex>
  );
};
