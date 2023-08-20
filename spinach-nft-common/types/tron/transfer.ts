export type TrxWalletTransferResponseData = {
  amount: string,
  block_timestamp: number,
  from: string,
  to: string,
  hash: string,
  confirmed: 0 | 1, // 0 (unconfirmed) or 1 (confirmed)
  decimals: number,
};

export type TrxWalletTransferResponse = {
  data: TrxWalletTransferResponseData[],
};
