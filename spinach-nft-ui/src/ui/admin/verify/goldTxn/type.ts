import {AdminVerifyBankFilterBasis} from '@spinach/next/ui/admin/verify/bank/type';
import {AdminVerifyFilterData, AdminVerifyInput} from '@spinach/next/ui/admin/verify/common/type';


export const adminVerifyGoldTxnFilterBasis = [
  'username',
  'name',
  'bankAccount',
] as const;

export type AdminVerifyGoldTxnFilterBasis = typeof adminVerifyGoldTxnFilterBasis[number];

export type AdminVerifyGoldTxnFilterData = AdminVerifyFilterData<AdminVerifyGoldTxnFilterBasis>;

export type AdminVerifyGoldTxnFilterInput = AdminVerifyInput<AdminVerifyBankFilterBasis>;
