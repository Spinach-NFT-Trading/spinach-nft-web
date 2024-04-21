export const adminPageTabs = [
  'agents',
  'members',
  'verifyId',
  'verifyBankAccount',
  'verifyBankTxn',
  'globalConfig',
] as const;

export type AdminPageTab = typeof adminPageTabs[number];
