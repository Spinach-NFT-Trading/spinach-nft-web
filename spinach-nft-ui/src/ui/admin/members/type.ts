export const adminMembersFilterBasis = [
  'idNumber',
  'username',
  'name',
  'email',
  'lineId',
  'wallet',
] as const;

export type AdminMembersFilterBasis = typeof adminMembersFilterBasis[number];

export type AdminMembersFilterInput = {
  key: AdminMembersFilterBasis,
  value: string,
};
