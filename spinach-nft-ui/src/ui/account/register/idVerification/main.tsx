import React from 'react';

import {accountIdVerificationType} from '@spinach/common/types/api/profile/id';

import {AnimatedCollapse} from '@spinach/next/components/layout/collapsible/animated';
import {AccountRegisterIdVerificationInput} from '@spinach/next/ui/account/register/idVerification/input';
import {AccountRegisterIdVerificationState} from '@spinach/next/ui/account/register/idVerification/type';
import {AccountRegisterCommonProps} from '@spinach/next/ui/account/register/type';


export const AccountRegisterIdVerification = (props: AccountRegisterCommonProps) => {
  const {show, input, onComplete} = props;

  const [state, setState] = React.useState<AccountRegisterIdVerificationState>({
    error: {
      idFront: null,
      idBack: null,
      handheld: null,
      secondaryFront: null,
    },
  });

  return (
    <AnimatedCollapse show={show}>
      <form className="flex flex-col gap-2" onSubmit={(e) => {
        e.preventDefault();
        onComplete();
      }}>
        <AccountRegisterIdVerificationInput
          {...props}
          type="idFront"
          state={state}
          setState={setState}
        />
        <AccountRegisterIdVerificationInput
          {...props}
          type="idBack"
          state={state}
          setState={setState}
        />
        <AccountRegisterIdVerificationInput
          {...props}
          type="secondaryFront"
          state={state}
          setState={setState}
        />
        <AccountRegisterIdVerificationInput
          {...props}
          type="handheld"
          state={state}
          setState={setState}
        />
        <button
          type="submit" className="enabled:button-clickable-bg disabled:button-disabled w-full p-2"
          disabled={accountIdVerificationType.some((type) => !input.image[type])}
        >
          註冊
        </button>
      </form>
    </AnimatedCollapse>
  );
};
