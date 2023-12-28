import {AccountIdVerificationState} from '@spinach/next/components/shared/account/idVerification/type';


export type AccountIdVerifyState = {
  errorMessage: string | null,
  form: AccountIdVerificationState,
};
