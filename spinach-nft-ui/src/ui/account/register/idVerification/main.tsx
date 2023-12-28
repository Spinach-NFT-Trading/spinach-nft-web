import React from 'react';

import {AnimatedCollapse} from '@spinach/next/components/layout/collapsible/animated';
import {AccountIdVerificationForm} from '@spinach/next/components/shared/account/idVerification/main';
import {AccountIdVerificationState} from '@spinach/next/components/shared/account/idVerification/type';
import {AccountRegisterCommonProps, AccountRegisterInput} from '@spinach/next/ui/account/register/type';


type Props = AccountRegisterCommonProps & {
  uploading: boolean,
};

export const AccountRegisterIdVerification = ({uploading, ...props}: Props) => {
  const {show, input, setInput, onComplete} = props;

  const [state, setState] = React.useState<AccountIdVerificationState>({
    error: {
      idFront: null,
      idBack: null,
      handheld: null,
      secondaryFront: null,
    },
  });

  return (
    <AnimatedCollapse show={show}>
      <AccountIdVerificationForm
        state={state}
        setState={setState}
        onSelected={(type, data) => setInput((original) => ({
          ...original,
          image: {
            ...original.image,
            [type]: data,
          },
        } satisfies AccountRegisterInput))}
        uploading={uploading}
        isNotReady={Object.values(input.image).some((data) => !data)}
        onComplete={onComplete}
        submitButtonText="註冊"
      />
    </AnimatedCollapse>
  );
};
