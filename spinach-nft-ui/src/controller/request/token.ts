import {txnRequestTokenCollection} from '@spinach/common/controller/collections/txn';
import {ObjectId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';


type GetRequestTokenListOpts = ControllerRequireUserIdOpts;

export const getRequestTokenList = async ({executorUserId}: GetRequestTokenListOpts): Promise<string[]> => {
  return txnRequestTokenCollection
    .find({accountId: new ObjectId(executorUserId)})
    .map(({token}) => token)
    .toArray();
};

type GenerateRequestTokenOpts = ControllerRequireUserIdOpts;

export const generateRequestToken = async ({
  executorUserId,
}: GenerateRequestTokenOpts): Promise<string> => {
  const token = crypto.randomUUID();

  await txnRequestTokenCollection.insertOne({
    accountId: new ObjectId(executorUserId),
    token,
  });

  return token;
};

type DeleteRequestTokenOpts = ControllerRequireUserIdOpts & {
  token: string
};

export const deleteRequestToken = async ({
  executorUserId,
  token,
}: DeleteRequestTokenOpts) => {
  await txnRequestTokenCollection.deleteOne({accountId: new ObjectId(executorUserId), token});
};
