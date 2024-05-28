export const adminExchangeRequestsTabs = [
  'queued',
  'matched',
  'completed',
] as const;

export type AdminExchangeRequestsTabs = typeof adminExchangeRequestsTabs[number];
