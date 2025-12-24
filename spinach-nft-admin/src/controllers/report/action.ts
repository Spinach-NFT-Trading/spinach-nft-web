"use server";

import {ObjectId} from "mongodb";

import {
  nftExchangeMatchedCollection,
  nftExchangeTokenCollection,
  nftInfoCollection,
  nftOnSaleCollection,
} from "@spinach/common/controller/collections/nft";
import {requireAdmin} from "@/lib/session";
import {
  NftExchangeReportBundle,
  NftExchangeReportItem,
  NftExchangeReportSummary,
  NftSellReportBundle,
  NftSellReportItem,
  NftSellReportSummary,
} from "@/types/report";

export type GetExchangeReportsOpts = {
  accountId: string;
  startEpochMs: number;
  endEpochMs: number;
};

export const getExchangeReportsAction = async ({
  accountId,
  startEpochMs,
  endEpochMs,
}: GetExchangeReportsOpts): Promise<NftExchangeReportBundle> => {
  await requireAdmin();

  // Get all tokens for this account
  const tokens = await nftExchangeTokenCollection
    .find({accountId: new ObjectId(accountId)})
    .map(({token}) => token)
    .toArray();

  if (tokens.length === 0) {
    return {
      summary: {
        totalCount: 0,
        totalRequested: 0,
        totalMatched: 0,
        totalRefunded: 0,
        completedCount: 0,
        pendingCount: 0,
      },
      items: [],
    };
  }

  // Query matched exchanges for those tokens within date range
  // The _id field contains the creation timestamp
  const startObjectId = ObjectId.createFromTime(Math.floor(startEpochMs / 1000));
  const endObjectId = ObjectId.createFromTime(Math.floor(endEpochMs / 1000));

  const matches = await nftExchangeMatchedCollection
    .find({
      token: {$in: tokens},
      _id: {$gte: startObjectId, $lte: endObjectId},
    })
    .sort({_id: -1})
    .toArray();

  // Transform to report items
  const items: NftExchangeReportItem[] = matches.map((match) => ({
    requestUuid: match.requestUuid,
    token: match.token,
    amount: match.amount,
    nftId: match.nftId.toHexString(),
    matchedAtEpochMs: match._id?.getTimestamp().getTime() ?? 0,
    completedAtEpochMs: match.completedAt?.getTime() ?? null,
  }));

  // Calculate summary
  const summary: NftExchangeReportSummary = {
    totalCount: items.length,
    totalRequested: items.reduce((sum, item) => sum + item.amount.requested, 0),
    totalMatched: items.reduce((sum, item) => sum + item.amount.matched, 0),
    totalRefunded: items.reduce((sum, item) => sum + item.amount.refunded, 0),
    completedCount: items.filter((item) => item.completedAtEpochMs !== null).length,
    pendingCount: items.filter((item) => item.completedAtEpochMs === null).length,
  };

  return {summary, items};
};

export type AccountWithTokens = {
  accountId: string;
  tokenCount: number;
};

export const listAccountsWithTokensAction = async (): Promise<AccountWithTokens[]> => {
  await requireAdmin();

  return nftExchangeTokenCollection
    .aggregate<AccountWithTokens>([
      {
        $group: {
          _id: "$accountId",
          tokenCount: {$sum: 1},
        },
      },
      {
        $project: {
          _id: 0,
          accountId: {$toString: "$_id"},
          tokenCount: 1,
        },
      },
    ])
    .toArray();
};

/**
 * Get NFT sell reports (limited NFTs created via /nft/sell)
 */
export const getSellReportsAction = async ({
  accountId,
  startEpochMs,
  endEpochMs,
}: GetExchangeReportsOpts): Promise<NftSellReportBundle> => {
  await requireAdmin();

  // Get all tokens for this account
  const tokens = await nftExchangeTokenCollection
    .find({accountId: new ObjectId(accountId)})
    .map(({token}) => token)
    .toArray();

  if (tokens.length === 0) {
    return {
      summary: {
        totalCount: 0,
        totalAmount: 0,
      },
      items: [],
    };
  }

  // Query nftInfo collection for Limited NFTs created with these tokens
  // The _id field contains the creation timestamp
  const startObjectId = ObjectId.createFromTime(Math.floor(startEpochMs / 1000));
  const endObjectId = ObjectId.createFromTime(Math.floor(endEpochMs / 1000));

  const nfts = await nftInfoCollection
    .find({
      requestedToken: {$in: tokens},
      isLimited: true,
      _id: {$gte: startObjectId, $lte: endObjectId},
    })
    .sort({_id: -1})
    .toArray();

  // Transform to report items
  const items: NftSellReportItem[] = nfts.map((nft) => {
    return {
      nftId: nft._id.toHexString(),
      token: nft.requestedToken!,
      amount: 0, // Placeholder, need to fetch
      bankAccount: nft.bankAccount!,
      createdAtEpochMs: nft._id.getTimestamp().getTime(),
    };
  });

  // Fetch prices from NftOnSaleCollection
  if (items.length > 0) {
    const nftIds = items.map((i) => new ObjectId(i.nftId));
    const onSales = await nftOnSaleCollection.find({
      id: {$in: nftIds},
    }).toArray();

    // Create a map for quick lookup
    const priceMap = new Map<string, number>();
    for (const os of onSales) {
      priceMap.set(os.id.toHexString(), os.price);
    }

    for (const item of items) {
      if (priceMap.has(item.nftId)) {
        item.amount = priceMap.get(item.nftId)!;
      }
    }
  }

  const summary: NftSellReportSummary = {
    totalCount: items.length,
    totalAmount: items.reduce((sum, item) => sum + item.amount, 0),
  };

  return {summary, items};
};
