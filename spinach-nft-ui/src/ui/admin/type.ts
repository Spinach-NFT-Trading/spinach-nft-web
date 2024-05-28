export const adminPageTabs = [
  'agents',
  'members',
  'exchangeRequests',
  'verifyId',
  'verifyBankAccount',
  'verifyBankTxn',
  'globalConfig',
] as const;

export type AdminPageTab = typeof adminPageTabs[number];
