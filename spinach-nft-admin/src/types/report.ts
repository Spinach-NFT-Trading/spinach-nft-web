/**
 * Types for NFT reports
 */

export type NftExchangeReportItem = {
  requestUuid: string,
  token: string,
  amount: {
    requested: number,
    matched: number,
    refunded: number,
  },
  nftId: string,
  matchedAtEpochMs: number,
  completedAtEpochMs: number | null,
};

export type NftExchangeReportSummary = {
  totalCount: number,
  totalRequested: number,
  totalMatched: number,
  totalRefunded: number,
  completedCount: number,
  pendingCount: number,
};

export type NftExchangeReportBundle = {
  summary: NftExchangeReportSummary,
  items: NftExchangeReportItem[],
};

export type NftSellReportItem = {
  nftId: string,
  token: string,
  amount: number,
  bankAccount: string,
  createdAtEpochMs: number,
};

export type NftSellReportSummary = {
  totalCount: number,
  totalAmount: number,
};

export type NftSellReportBundle = {
  summary: NftSellReportSummary,
  items: NftSellReportItem[],
};
