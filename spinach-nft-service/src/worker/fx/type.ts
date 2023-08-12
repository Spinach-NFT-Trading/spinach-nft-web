export type MaxWsTradeData = {
  // Price (in string)
  p: string,
};

export type MaxWsTradeMessage = {
  // Channel
  c: 'trade',
  // Market
  M: string,
  // Event
  e: 'snapshot' | 'update',
  // Trade Data
  t: MaxWsTradeData[],
  // Last update epoch
  T: number,
};

export type MaxWsSubscribedMessage = {
  // Event
  e: 'subscribed',
  // Request ID
  i: string,
};

export type MaxWsUnhandledMessage = {
  // Channel
  c: never,
  // Event
  e: never,
};

export type MaxWsMessage = MaxWsTradeMessage | MaxWsSubscribedMessage | MaxWsUnhandledMessage;
