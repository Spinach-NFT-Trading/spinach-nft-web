import {VerificationStatus} from '@spinach/common/types/common/status';


export const verificationStatusText: {[status in VerificationStatus]: string} = {
  verified: '已認證',
  unverified: '未認證',
  rejected: '認證失敗',
};

export const verificationStatusTextColor: {[status in VerificationStatus]: string} = {
  verified: 'text-green-400',
  unverified: 'text-amber-400',
  rejected: 'text-red-400',
};
