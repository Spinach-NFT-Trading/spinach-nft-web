import React from 'react';

import {phonePattern} from '@spinach/common/const/auth';
import {apiPath} from '@spinach/common/const/path';
import {
  SmsVerifyFinalizeRequest,
  SmsVerifyFinalizeResponse,
} from '@spinach/common/types/api/auth/verify/sms/finalize';
import {SmsVerifyInitialRequest, SmsVerifyInitialResponse} from '@spinach/common/types/api/auth/verify/sms/initial';
import {translateApiError} from '@spinach/common/utils/translate/apiError';
import clsx from 'clsx';

import {AnimatedCollapse} from '@spinach/next/components/layout/collapsible/animated';
import {Flex} from '@spinach/next/components/layout/flex';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {InputFloatingLabel} from '@spinach/next/components/shared/common/input/field';
import {AccountRegisterVerificationState} from '@spinach/next/ui/account/register/sms/type';
import {sendApiPost} from '@spinach/next/utils/api/common';


type Props = {
  show: boolean,
  onPhoneVerified: (key: string) => void,
};

export const AccountRegisterSmsVerification = ({show, onPhoneVerified}: Props) => {
  const [state, setState] = React.useState<AccountRegisterVerificationState>({
    phone: '',
    otp: '',
    loading: false,
    error: null,
    verificationKey: null,
    initialized: false,
    finalized: false,
  });
  const {
    phone,
    otp,
    loading,
    initialized,
    finalized,
    error,
    verificationKey,
  } = state;

  const onPhoneSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState((original) => ({...original, loading: true}));

    const response = await sendApiPost<SmsVerifyInitialResponse>({
      path: apiPath.auth.sms.initial,
      data: {phone} satisfies SmsVerifyInitialRequest,
    });
    if (!response.success) {
      setState((original) => ({...original, loading: false, error: response.error}));
      return;
    }

    setState((original) => ({
      ...original,
      loading: false,
      initialized: true,
      error: null,
      verificationKey: response.data.key,
    }));
  };

  const onCodeSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!verificationKey) {
      return;
    }

    setState((original) => ({...original, loading: true}));

    const response = await sendApiPost<SmsVerifyFinalizeResponse>({
      path: apiPath.auth.sms.finalize,
      data: {key: verificationKey, otp} satisfies SmsVerifyFinalizeRequest,
    });
    if (!response.success) {
      setState((original) => ({...original, loading: false, error: response.error}));
      return;
    }

    setState((original) => ({
      ...original,
      loading: false,
      finalized: true,
      error: null,
    }));
    onPhoneVerified(response.data.key);
  };

  const disableInit = loading || initialized;
  const disableOtp = loading || !initialized || !verificationKey;
  const isCompleted = initialized && finalized;

  return (
    <AnimatedCollapse show={show}>
      <Flex className="gap-2">
        {error && <Alert>{translateApiError(error)}</Alert>}
        <form onSubmit={onPhoneSubmitted} className="flex flex-col gap-2">
          <InputFloatingLabel
            id="phone"
            placeholder="手機號碼"
            type="tel"
            value={phone}
            onChange={({target}) => setState((original) => ({
              ...original,
              phone: target.value,
            } satisfies AccountRegisterVerificationState))}
            autoComplete="tel"
            required
            pattern={phonePattern}
            disabled={disableInit}
          />
          <AnimatedCollapse show={!isCompleted}>
            <button
              type="submit"
              disabled={disableInit}
              className="button-clickable-bg disabled:button-disabled w-full p-2"
            >
            獲取驗證碼
            </button>
          </AnimatedCollapse>
        </form>
        <AnimatedCollapse show={initialized && !finalized}>
          <form onSubmit={onCodeSubmitted} className="flex flex-col gap-2">
            <InputFloatingLabel
              id="code"
              placeholder="驗證碼"
              type="text"
              value={otp}
              onChange={({target}) => setState((original) => ({
                ...original,
                otp: target.value,
              } satisfies AccountRegisterVerificationState))}
              disabled={disableOtp}
              required
            />
            <button type="submit" disabled={disableOtp} className={clsx(
              'button-clickable-bg disabled:button-disabled w-full p-2',
            )}>
            驗證手機
            </button>
          </form>
        </AnimatedCollapse>
      </Flex>
    </AnimatedCollapse>
  );
};
