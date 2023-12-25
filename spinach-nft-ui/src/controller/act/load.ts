import {azureContainer} from '@spinach/common/controller/blob/const';
import {getImageBlob} from '@spinach/common/controller/blob/get';
import {toUnique} from '@spinach/common/utils/array';
import {ObjectId} from 'mongodb';

import {getNftLastTradedPriceMap, getNftPositionInfo} from '@spinach/next/controller/nft';
import {getUnverifiedBankDetails, getVerifiedBankDetailsOfUser} from '@spinach/next/controller/user/bankDetails';
import {getUnverifiedUsers, getUserDataMap} from '@spinach/next/controller/user/info';
import {NftListingData} from '@spinach/next/types/nft';
import {UserDataLoadingOpts} from '@spinach/next/types/userData/load';
import {UserLazyLoadedData} from '@spinach/next/types/userData/main';


type GetUserLazyDataOpts = {
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

  if (type === 'verifiedBankDetails') {
    return await getVerifiedBankDetailsOfUser(accountId) satisfies UserLazyLoadedData['verifiedBankDetails'];
  }

  if (type === 'adminImageOfId') {
    return await getImageBlob({
      container: options.opts.type,
      name: options.opts.userId,
    }) satisfies UserLazyLoadedData['adminImageOfId'];
  }

  if (type === 'adminImageOfBankDetails') {
    return await getImageBlob({
      container: azureContainer.bankDetails,
      name: options.opts.uuid,
    }) satisfies UserLazyLoadedData['adminImageOfBankDetails'];
  }

  if (type === 'adminUnverifiedBankDetails') {
    const details = await getUnverifiedBankDetails({executorUserId: accountId});
    const userInfoMap = await getUserDataMap(toUnique(details.map(({userId}) => userId)));

    return {userDataMap: userInfoMap, details} satisfies UserLazyLoadedData['adminUnverifiedBankDetails'];
  }

  if (type === 'adminUnverifiedAccounts') {
    return await getUnverifiedUsers({
      executorUserId: accountId,
    }) satisfies UserLazyLoadedData['adminUnverifiedAccounts'];
  }

  console.error(`Unknown data type ${type satisfies never} to load data`);
  return undefined;
};

export const handleUserLoad = async (opts: GetUserLazyDataOpts): Promise<UserLazyLoadedData> => {
  const {options} = opts;

  return {
    [options.type]: await loadData(opts),
  };
};
