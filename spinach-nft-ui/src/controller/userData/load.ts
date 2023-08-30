import {ObjectId} from 'mongodb';

import {getNftLastTradedPriceMap, getNftPositionInfo} from '@spinach/next/controller/nft';
import {NftListingData} from '@spinach/next/types/nft';
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
    const nftInfo = await (await getNftPositionInfo(new ObjectId(accountId))).toArray();
    const nftPriceMap = await getNftLastTradedPriceMap(nftInfo.map(({_id}) => _id));

    return nftInfo.map((data) => ({
      id: data._id.toString(),
      image: data.image,
      price: nftPriceMap[data._id.toString()],
    } satisfies NftListingData)) satisfies UserLazyLoadedData['nftPosition'];
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
