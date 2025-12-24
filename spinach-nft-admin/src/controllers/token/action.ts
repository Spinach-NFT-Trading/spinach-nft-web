"use server";

import {ObjectId} from "mongodb";
import {v4 as uuidv4} from "uuid";

import {nftExchangeTokenCollection} from "@spinach/common/controller/collections/nft";
import {requireAdmin} from "@/lib/session";
import {TokenFeeConfig} from "@/types/admin";

type CreateTokenOpts = {
  userId: string;
  webhook: string;
  note?: string;
  fee?: TokenFeeConfig;
};

type UpdateTokenOpts = {
  token: string;
  webhook: string;
  note?: string;
  fee?: TokenFeeConfig;
};

export const createTokenAction = async (opts: CreateTokenOpts) => {
  await requireAdmin();
  const token = uuidv4();
  await nftExchangeTokenCollection.insertOne({
    accountId: new ObjectId(opts.userId),
    token,
    webhook: opts.webhook,
    note: opts.note,
    fee: opts.fee,
  });
  return {token, webhook: opts.webhook, note: opts.note, fee: opts.fee};
};

export const updateTokenAction = async (opts: UpdateTokenOpts) => {
  await requireAdmin();
  await nftExchangeTokenCollection.updateOne(
    {token: opts.token},
    {$set: {webhook: opts.webhook, note: opts.note, fee: opts.fee}},
  );
};

export const batchUpdateTokenFeesAction = async (userId: string, fee: TokenFeeConfig) => {
  await requireAdmin();
  await nftExchangeTokenCollection.updateMany(
    {accountId: new ObjectId(userId)},
    {$set: {fee}},
  );
};

export const deleteTokenAction = async (token: string) => {
  await requireAdmin();
  await nftExchangeTokenCollection.deleteOne({token});
};

export const listTokensForUserAction = async (userId: string) => {
  await requireAdmin();
  return nftExchangeTokenCollection
    .aggregate<{
      token: string;
      webhook: string;
      note?: string;
      accountId: string;
      fee?: TokenFeeConfig;
    }>([
      {$match: {accountId: new ObjectId(userId)}},
      {
        $project: {
          _id: 0,
          token: 1,
          webhook: 1,
          note: 1,
          accountId: {$toString: "$accountId"},
          fee: 1,
        },
      },
    ])
    .toArray();
};

export const listAllTokensAction = async () => {
  await requireAdmin();
  return nftExchangeTokenCollection
    .aggregate<{
      token: string;
      webhook: string;
      note?: string;
      accountId: string;
      fee?: TokenFeeConfig;
    }>([
      {
        $project: {
          _id: 0,
          token: 1,
          webhook: 1,
          note: 1,
          accountId: {$toString: "$accountId"},
          fee: 1,
        },
      },
    ])
    .toArray();
};
