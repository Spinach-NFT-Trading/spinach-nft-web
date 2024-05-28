export const adminExchangeRequestsTabs = [
  'queued',
  'pending',
  'completed',
] as const;

export type AdminExchangeRequestsTabs = typeof adminExchangeRequestsTabs[number];
