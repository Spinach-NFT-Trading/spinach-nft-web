export const adminPageTabs = [
  'agents',
  'members',
  'queuedExchangeRequests',
  'verifyId',
  'verifyBankAccount',
  'verifyBankTxn',
  'globalConfig',
] as const;

export type AdminPageTab = typeof adminPageTabs[number];
