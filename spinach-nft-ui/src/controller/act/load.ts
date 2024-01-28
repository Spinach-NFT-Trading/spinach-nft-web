import {azureContainer} from '@spinach/common/controller/blob/const';
import {getImageBlob} from '@spinach/common/controller/blob/get';
import {toUnique} from '@spinach/common/utils/array';
import {ObjectId} from 'mongodb';

import {getUnverifiedGoldPurchaseTwBankRecordClient} from '@spinach/next/controller/gold/twBank';
import {getWalletClientMap} from '@spinach/next/controller/gold/wallet';
import {getNftTxnOfUser} from '@spinach/next/controller/nft/txn';
import {getNftLastTradedPriceMap, getNftPositionInfo} from '@spinach/next/controller/nft/utils';
import {getUserBalanceDailySummary} from '@spinach/next/controller/user/balance/daily';
import {getUserBalanceHistory} from '@spinach/next/controller/user/balance/history';
import {getUserBalanceActivityMap} from '@spinach/next/controller/user/balance/summary';
import {
  getBankDetailsMap,
  getBankDetailsOfUser,
  getUnverifiedBankDetails,
  getVerifiedBankDetailsOfUser,
} from '@spinach/next/controller/user/bankDetails';
import {getUnverifiedUsers, getUserDataMap} from '@spinach/next/controller/user/info';
import {getAccountMembers} from '@spinach/next/controller/user/members';
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

  if (type === 'bankDetails') {
    return await getBankDetailsOfUser({
      executorUserId: accountId,
      userId: options.opts.userId,
    }) satisfies UserLazyLoadedData['bankDetails'];
  }

  if (type === 'verifiedBankDetails') {
    return await getVerifiedBankDetailsOfUser(accountId) satisfies UserLazyLoadedData['verifiedBankDetails'];
  }

  if (type === 'adminMemberList') {
    const members = await getAccountMembers({
      executorUserId: accountId,
    });
    const balanceActivityMap = await getUserBalanceActivityMap({
      executorUserId: accountId,
      userIdsToCheck: members.map(({id}) => new ObjectId(id)),
      ...options.opts,
    });

    return {
      members,
      balanceActivityMap,
    } satisfies UserLazyLoadedData['adminMemberList'];
  }

  if (type === 'adminMemberNftTxn') {
    const nftTxn = await getNftTxnOfUser({
      executorUserId: accountId,
      ...options.opts,
    });
    const userDataMap = await getUserDataMap(toUnique(nftTxn.flatMap(({from, to}) => [from, to])));

    return {
      userDataMap,
      nftTxn,
    } satisfies UserLazyLoadedData['adminMemberNftTxn'];
  }

  if (type === 'adminMemberBalanceDaily') {
    return await getUserBalanceDailySummary({
      executorUserId: accountId,
      ...options.opts,
    }) satisfies UserLazyLoadedData['adminMemberBalanceDaily'];
  }

  if (type === 'adminMemberBalanceDetails') {
    return await getUserBalanceHistory({
      executorUserId: accountId,
      ...options.opts,
    }) satisfies UserLazyLoadedData['adminMemberBalanceDetails'];
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

  if (type === 'adminImageOfGoldTxnTwBank') {
    return await getImageBlob({
      container: azureContainer.goldPurchase.twBank,
      name: options.opts.uuid,
    }) satisfies UserLazyLoadedData['adminImageOfGoldTxnTwBank'];
  }

  if (type === 'adminUnverifiedBankDetails') {
    const details = await getUnverifiedBankDetails({executorUserId: accountId});
    const userDataMap = await getUserDataMap(toUnique(details.map(({userId}) => userId)));

    return {userDataMap, details} satisfies UserLazyLoadedData['adminUnverifiedBankDetails'];
  }

  if (type === 'adminUnverifiedGoldTxn') {
    const unverifiedTwBank = await getUnverifiedGoldPurchaseTwBankRecordClient({executorUserId: accountId});

    const [
      userDataMap,
      bankDetailsMap,
      walletMap,
    ] = await Promise.all([
      getUserDataMap(toUnique(unverifiedTwBank.map(({accountId}) => accountId))),
      getBankDetailsMap(toUnique(unverifiedTwBank.map(({sourceBankDetailsUuid}) => sourceBankDetailsUuid))),
      getWalletClientMap(toUnique(unverifiedTwBank.map(({targetWalletId}) => targetWalletId))),
    ]);

    return {
      userDataMap,
      bankDetailsMap,
      walletMap,
      unverified: {
        twBank: unverifiedTwBank,
      },
    } satisfies UserLazyLoadedData['adminUnverifiedGoldTxn'];
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
