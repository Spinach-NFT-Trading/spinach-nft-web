import {AccountIdVerificationState} from '@spinach/next/components/shared/account/idVerification/type';


export const initialAccountIdVerificationState: AccountIdVerificationState = {
  error: {
    idFront: null,
    idBack: null,
    handheld: null,
    secondaryFront: null,
  },
  fileRefs: {
    idFront: null,
    idBack: null,
    handheld: null,
    secondaryFront: null,
  },
};
