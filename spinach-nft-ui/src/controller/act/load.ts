import {ObjectId} from 'mongodb';

import {getNftLastTradedPriceMap, getNftPositionInfo} from '@spinach/next/controller/nft';
import {getUserInfoById} from '@spinach/next/controller/user/info';
import {NftListingData} from '@spinach/next/types/nft';
import {UserDataLoadingOpts} from '@spinach/next/types/userData/load';
import {UserLazyLoadedData} from '@spinach/next/types/userData/main';


export const emptyLazyData: UserLazyLoadedData = {
  nftPosition: [],
};

type GetUserLazyDataOpts = {
  initialData: UserLazyLoadedData,
  accountId: string,
  options: UserDataLoadingOpts,
};

const loadData = async ({options, accountId} : GetUserLazyDataOpts) => {
  const type = options.type;

  if (type === 'nftPosition') {
    const nftInfo = await (await getNftPositionInfo(new ObjectId(accountId))).toArray();
    const nftPriceMap = await getNftLastTradedPriceMap(nftInfo.map(({_id}) => _id));

    return nftInfo.map((data) => ({
      id: data._id.toString(),
      price: nftPriceMap[data._id.toString()],
      ...data,
    } satisfies NftListingData)) satisfies UserLazyLoadedData['nftPosition'];
  }

  if (type === 'userInfo') {
    return await getUserInfoById(accountId) satisfies UserLazyLoadedData['userInfo'];
  }

  console.error(`Unknown data type ${type satisfies never} to load data`);
  return undefined;
};

export const handleUserLoad = async (opts: GetUserLazyDataOpts): Promise<UserLazyLoadedData> => {
  const {initialData, options} = opts;

  return {
    ...initialData,
    ...emptyLazyData,
    [options.type]: await loadData(opts),
  };
};
