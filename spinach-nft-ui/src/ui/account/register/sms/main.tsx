import React from 'react';

import {phonePattern} from '@spinach/common/const/auth';
import {apiPath} from '@spinach/common/const/path';
import {
  SmsVerifyFinalizeRequest,
  SmsVerifyFinalizeResponse,
  SmsVerifyFinalizeResponseData,
} from '@spinach/common/types/api/auth/verify/sms/finalize';
import {SmsVerifyInitialRequest, SmsVerifyInitialResponse} from '@spinach/common/types/api/auth/verify/sms/initial';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {AnimatedCollapse} from '@spinach/next/components/layout/collapsible/animated';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexForm} from '@spinach/next/components/layout/flex/form';
import {FlexLink} from '@spinach/next/components/layout/flex/link';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {InputFloatingLabel} from '@spinach/next/components/shared/common/input/field';
import {useI18nApiErrorTranslator} from '@spinach/next/hooks/i18n/apiError/main';
import {AccountRegisterSmsVerificationState} from '@spinach/next/ui/account/register/sms/type';
import {sendApiPost} from '@spinach/next/utils/api/common';


type Props = {
  show: boolean,
  onPhoneVerified: (response: SmsVerifyFinalizeResponseData) => void,
};

export const AccountRegisterSmsVerification = ({show, onPhoneVerified}: Props) => {
  const [state, setState] = React.useState<AccountRegisterSmsVerificationState>({
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

  const t = useTranslations('UI.UserControl');
  const t2 = useTranslations('UI.InPage.Account.Register');
  const t3 = useTranslations('UI.Account');

  const translateApiError = useI18nApiErrorTranslator();

  const onPhoneSubmitted = async () => {
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

  const onCodeSubmitted = async () => {
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
    onPhoneVerified(response.data);
  };

  const disableInit = loading || initialized;
  const disableOtp = loading || !initialized || !verificationKey;
  const isCompleted = initialized && finalized;

  return (
    <AnimatedCollapse show={show}>
      <Flex className="gap-2">
        {error && <Alert>{translateApiError(error)}</Alert>}
        <FlexForm className="gap-2" onSubmit={onPhoneSubmitted}>
          <InputFloatingLabel
            id="phone"
            placeholder={t3('Info.Phone')}
            type="tel"
            value={phone}
            onChange={({target}) => setState((original) => ({
              ...original,
              phone: target.value,
            } satisfies AccountRegisterSmsVerificationState))}
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
              {t2('Sms.Verification.GetCode')}
            </button>
          </AnimatedCollapse>
        </FlexForm>
        <AnimatedCollapse show={initialized && !finalized}>
          <FlexForm className="gap-2" onSubmit={onCodeSubmitted}>
            <InputFloatingLabel
              id="code"
              placeholder={t2('Sms.Verification.Code')}
              type="text"
              value={otp}
              onChange={({target}) => setState((original) => ({
                ...original,
                otp: target.value,
              } satisfies AccountRegisterSmsVerificationState))}
              disabled={disableOtp}
              required
            />
            <button type="submit" disabled={disableOtp} className={clsx(
              'button-clickable-bg disabled:button-disabled w-full p-2',
            )}>
              {t2('Sms.Verification.Submit')}
            </button>
          </FlexForm>
        </AnimatedCollapse>
        <Flex direction="row" center className="text-base">
          <div>{t2('AlreadyHaveAnAccount')}</div>
          <FlexLink href="/account/login" className="text-link">
            {t('Login')}
          </FlexLink>
        </Flex>
      </Flex>
    </AnimatedCollapse>
  );
};
