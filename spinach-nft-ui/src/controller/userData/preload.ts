import {getGoldAsset} from '@spinach/common/controller/actors/user';
import {ObjectId} from 'mongodb';

import {isAccountSmsVerified} from '@spinach/next/controller/account/verify/sms/complete';
import {getNftAsset} from '@spinach/next/controller/nft';
import {UserPreloadedData} from '@spinach/next/types/userData/main';


export const getUserPreloadedData = async (userIdString: string | undefined): Promise<UserPreloadedData | null> => {
  if (!userIdString) {
    return null;
  }

  const userId = new ObjectId(userIdString);
  const [
    goldAsset,
    nftAsset,
    sms,
  ] = await Promise.all([
    getGoldAsset(userId),
    getNftAsset(userId),
    isAccountSmsVerified(userId),
  ]);

  return {
    assets: {
      gold: goldAsset?.current,
      nft: nftAsset,
    },
    verified: {
      sms,
    },
  };
};
