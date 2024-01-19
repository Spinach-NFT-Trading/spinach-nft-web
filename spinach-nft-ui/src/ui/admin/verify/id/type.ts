import {AdminVerifyFilterData, AdminVerifyInput} from '@spinach/next/ui/admin/verify/common/type';


export const adminVerifyIdFilterBasis = [
  'idNumber',
  'username',
  'name',
] as const;

export type AdminVerifyIdFilterBasis = typeof adminVerifyIdFilterBasis[number];

export type AdminVerifyIdFilterData = AdminVerifyFilterData<AdminVerifyIdFilterBasis>;

export type AdminVerifyIdFilterInput = AdminVerifyInput<AdminVerifyIdFilterBasis>;
