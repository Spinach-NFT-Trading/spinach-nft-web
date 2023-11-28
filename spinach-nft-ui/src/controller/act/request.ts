import {ApiErrorCode} from '@spinach/common/types/api/error';
import {ObjectId} from 'mongodb';

import {recordPendingTxN} from '@spinach/next/controller/gold';
import {buyNft} from '@spinach/next/controller/nft';
import {markUserVerified} from '@spinach/next/controller/user/update';
import {UserDataRequestOpts} from '@spinach/next/types/userData/upload';


type HandleUserRequestOpts = {
  accountId: string,
  options: UserDataRequestOpts,
};

export const handleUserRequest = async ({accountId, options}: HandleUserRequestOpts): Promise<ApiErrorCode | null> => {
  const {type, data} = options;

  if (type === 'exchangeGold') {
    return recordPendingTxN({account: accountId});
  }

  if (type === 'nftBuy') {
    return buyNft({buyer: new ObjectId(accountId), nftId: new ObjectId(data.nftId)});
  }

  if (type === 'adminVerifyAccount') {
    return markUserVerified({executorUserId: accountId, targetId: data.targetId});
  }

  console.error(`Unhandled user request type [${type satisfies never}]`);
  return null;
};
