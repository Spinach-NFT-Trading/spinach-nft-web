import {getCurrentBalance} from '@spinach/common/controller/actors/user';
import {ObjectId} from 'mongodb';

import {UserPreloadedData} from '@spinach/next/types/userData/main';


export const getUserPreloadedData = async (userId: string | undefined): Promise<UserPreloadedData | null> => {
  if (!userId) {
    return null;
  }

  const [
    currentBalance,
  ] = await Promise.all([
    getCurrentBalance(new ObjectId(userId)),
  ]);

  return {
    balance: currentBalance?.current,
  };
};
