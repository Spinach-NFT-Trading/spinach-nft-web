import {nftExchangeTokenCollection} from '@spinach/common/controller/collections/nft';
import {NftExchangeToken, NftExchangeTokenMap} from '@spinach/common/types/data/nft/token';
import {ObjectId} from 'mongodb';
import {v4} from 'uuid';

import {getDataAsMap} from '@spinach/next/controller/common';
import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';


type GetNftExchangeTokenMapOpts = ControllerRequireUserIdOpts;

export const getNftExchangeTokenMap = async ({
  executorUserId,
}: GetNftExchangeTokenMapOpts): Promise<NftExchangeTokenMap> => {
  return getDataAsMap(
    nftExchangeTokenCollection,
    ({token}) => token,
    {accountId: new ObjectId(executorUserId)},
  );
};

type GenerateNftExchangeTokenOpts = ControllerRequireUserIdOpts & {
  webhook: string,
};

export const generateNftExchangeToken = async ({
  executorUserId,
  webhook,
}: GenerateNftExchangeTokenOpts): Promise<NftExchangeToken> => {
  const token = v4();

  await nftExchangeTokenCollection.insertOne({
    accountId: new ObjectId(executorUserId),
    token,
    webhook,
  });

  return {token, webhook};
};

type DeleteNftExchangeTokenOpts = ControllerRequireUserIdOpts & {
  token: string
};

export const deleteNftExchangeToken = async ({
  executorUserId,
  token,
}: DeleteNftExchangeTokenOpts) => {
  await nftExchangeTokenCollection.deleteOne({accountId: new ObjectId(executorUserId), token});
};
