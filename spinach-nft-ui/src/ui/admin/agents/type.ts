export const adminAgentsFilterBasis = [
  'idNumber',
  'username',
  'name',
] as const;

export type AdminAgentsFilterBasis = typeof adminAgentsFilterBasis[number];

export type AdminAgentsFilterInput = {
  key: AdminAgentsFilterBasis,
  value: string,
};
