import {VerificationStatus} from '@spinach/common/types/common/status';
import {Nullable} from '@spinach/common/types/common/typing';

import {I18nMessageKeysOfNamespace} from '@spinach/next/types/i18n';


export const verificationStatusI18nId: {
  [status in VerificationStatus]: I18nMessageKeysOfNamespace<'UI.VerificationStatus'>
} = {
  verified: 'Verified',
  unverified: 'Unverified',
  rejected: 'Rejected',
};

export const verificationStatusTextStyleDefault: {[status in VerificationStatus]: string} = {
  verified: 'text-green-400',
  unverified: 'text-amber-400',
  rejected: 'text-red-400',
};

export const verificationStatusTextStyleActive: {[status in VerificationStatus]: string} = {
  verified: 'text-green-700',
  unverified: 'text-amber-700',
  rejected: 'text-red-700',
};

export const getVerificationStatusTextStyleMap = (isActive: Nullable<boolean>) => {
  return isActive ? verificationStatusTextStyleActive : verificationStatusTextStyleDefault;
};
