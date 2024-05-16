export type NftExchangeQueuedModel = {
  requestUuid: string,
  token: string,
  amount: number,
};

export type NftExchangeQueuedData = NftExchangeQueuedModel & {
  createdAtEpochMs: number,
};
