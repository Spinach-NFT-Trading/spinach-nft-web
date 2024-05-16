import {nftExchangeTokenCollection} from '@spinach/common/controller/collections/nft';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';


type GetNftExchangeTokenListOpts = ControllerRequireUserIdOpts;

export const getNftExchangeTokenList = async ({executorUserId}: GetNftExchangeTokenListOpts): Promise<string[]> => {
  return nftExchangeTokenCollection
    .find({accountId: new ObjectId(executorUserId)})
    .map(({token}) => token)
    .toArray();
};

type GenerateNftExchangeTokenOpts = ControllerRequireUserIdOpts;

export const generateNftExchangeToken = async ({
  executorUserId,
}: GenerateNftExchangeTokenOpts): Promise<string> => {
  const token = crypto.randomUUID();

  await nftExchangeTokenCollection.insertOne({
    accountId: new ObjectId(executorUserId),
    token,
  });

  return token;
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
