import React from 'react';

import {AnimatedCollapse} from '@spinach/next/components/layout/collapsible/animated';
import {FlexForm} from '@spinach/next/components/layout/flex/form';
import {AccountRegisterIdVerificationInput} from '@spinach/next/ui/account/register/idVerification/input';
import {AccountRegisterIdVerificationState} from '@spinach/next/ui/account/register/idVerification/type';
import {AccountRegisterCommonProps} from '@spinach/next/ui/account/register/type';


type Props = AccountRegisterCommonProps & {
  uploading: boolean,
};

export const AccountRegisterIdVerification = ({uploading, ...props}: Props) => {
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
      <FlexForm className="gap-2" onSubmit={onComplete}>
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
          disabled={uploading || Object.values(input.image).some((data) => !data)}
        >
          {uploading ? '上傳中...' : '註冊'}
        </button>
      </FlexForm>
    </AnimatedCollapse>
  );
};
