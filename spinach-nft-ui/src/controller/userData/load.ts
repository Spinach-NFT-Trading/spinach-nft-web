import {UserDataLoadingOpts} from '@spinach/next/types/userData/load';


type HandleUserLoadingOpts = {
  accountId: string,
  options: UserDataLoadingOpts,
};

export const handleUserLoad = async (_: HandleUserLoadingOpts): Promise<null> => {
  return null;
};
