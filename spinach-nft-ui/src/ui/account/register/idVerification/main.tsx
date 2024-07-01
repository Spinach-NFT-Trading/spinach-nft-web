import React from 'react';

import {useTranslations} from 'next-intl';

import {AnimatedCollapse} from '@spinach/next/components/layout/collapsible/animated';
import {initialAccountIdVerificationState} from '@spinach/next/components/shared/account/idVerification/const';
import {AccountIdVerificationForm} from '@spinach/next/components/shared/account/idVerification/main';
import {AccountIdVerificationState} from '@spinach/next/components/shared/account/idVerification/type';
import {AccountRegisterCommonProps, AccountRegisterInput} from '@spinach/next/ui/account/register/type';


type Props = AccountRegisterCommonProps & {
  uploading: boolean,
};

export const AccountRegisterIdVerification = ({uploading, ...props}: Props) => {
  const {show, input, setInput, onComplete} = props;

  const t = useTranslations('UI.UserControl');

  const [state, setState] = React.useState<AccountIdVerificationState>(
    initialAccountIdVerificationState,
  );

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
        submitButtonText={t('Register')}
      />
    </AnimatedCollapse>
  );
};
