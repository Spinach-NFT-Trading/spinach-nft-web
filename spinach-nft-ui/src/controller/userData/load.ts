import {ObjectId} from 'mongodb';

import {getNftPositionInfo} from '@spinach/next/controller/nft';
import {UserLazyLoadedDataType} from '@spinach/next/types/userData/lazyLoaded';
import {UserLazyLoadedData} from '@spinach/next/types/userData/main';


export const emptyLazyData: UserLazyLoadedData = {
  nftPosition: [],
};

type GetUserLazyDataOpts = {
  initialData: UserLazyLoadedData,
  accountId: string,
  type: UserLazyLoadedDataType,
};

const loadData = async ({type, accountId} : GetUserLazyDataOpts) => {
  if (type === 'nftPosition') {
    return (await getNftPositionInfo(new ObjectId(accountId))).toArray();
  }

  console.error(`Unknown data type ${type satisfies never} to load data`);
  return undefined;
};

export const handleUserLoad = async (opts: GetUserLazyDataOpts): Promise<UserLazyLoadedData> => {
  const {initialData, type} = opts;

  return {
    ...initialData,
    ...emptyLazyData,
    [type]: await loadData(opts),
  };
};
