export const adminPageTabs = [
  'agents',
  'members',
  'verifyId',
  'verifyBankAccount',
  'verifyBankTxn',
] as const;

export type AdminPageTab = typeof adminPageTabs[number];
