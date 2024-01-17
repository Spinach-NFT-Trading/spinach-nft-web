export const adminPageTabs = [
  'members',
  'verifyId',
  'verifyBankAccount',
  'verifyBankTxn',
] as const;

export type AdminPageTab = typeof adminPageTabs[number];
