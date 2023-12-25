import {VerificationStatus} from '@spinach/common/types/common/status';
import {Nullable} from '@spinach/common/types/common/typing';


export const verificationStatusText: {[status in VerificationStatus]: string} = {
  verified: '已認證',
  unverified: '未認證',
  rejected: '認證失敗',
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
