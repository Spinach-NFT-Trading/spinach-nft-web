import {AdminVerifyFilterData, AdminVerifyInput} from '@spinach/next/ui/admin/verify/common/type';


export const adminVerifyBankFilterBasis = [
  'username',
  'name',
  'bankAccount',
] as const;

export type AdminVerifyBankFilterBasis = typeof adminVerifyBankFilterBasis[number];

export type AdminVerifyBankFilterData = AdminVerifyFilterData<AdminVerifyBankFilterBasis>;

export type AdminVerifyBankFilterInput = AdminVerifyInput<AdminVerifyBankFilterBasis>;
