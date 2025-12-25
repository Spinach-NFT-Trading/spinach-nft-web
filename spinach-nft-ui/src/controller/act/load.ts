import {getGlobalConfig} from '@spinach/common/controller/actors/global';
import {getUserInfoById} from '@spinach/common/controller/user/info';
import {isSuspended} from '@spinach/common/controller/user/permission';
import {toUnique} from '@spinach/common/utils/array';
import {toObject} from '@spinach/common/utils/object/make';
import {isNotNullish} from '@spinach/common/utils/type';
import {ObjectId} from 'mongodb';

import {
  getGoldPurchaseTwBankVerificationImage,
  getUnverifiedGoldPurchaseTwBankRecordClient,
} from '@spinach/next/controller/gold/twBank';
import {getWalletClientMap} from '@spinach/next/controller/gold/wallet';
import {getLimitedNftProofImage} from '@spinach/next/controller/nft/limited';
import {getNftListingData} from '@spinach/next/controller/nft/listing';
import {generateNftExchangeToken, getNftExchangeTokenMap} from '@spinach/next/controller/nft/request/token';
import {getNftTxnOfUser} from '@spinach/next/controller/nft/txn';
import {getNftPositionInfo} from '@spinach/next/controller/nft/utils';
import {getUserBalanceDailySummary} from '@spinach/next/controller/user/balance/daily';
import {getUserBalanceHistory} from '@spinach/next/controller/user/balance/history';
import {getUserBalanceActivityMap} from '@spinach/next/controller/user/balance/summary';
import {
  getBankDetailsMap,
  getBankDetailsOfUser,
  getBankDetailsVerificationImageByUuid,
  getUnverifiedBankDetails,
  getVerifiedBankDetailsOfUser,
} from '@spinach/next/controller/user/bankDetails';
import {getUnverifiedUsers, getUserDataMap} from '@spinach/next/controller/user/info';
import {getAccountMemberListByAgent, getUserInfoList} from '@spinach/next/controller/user/members';
import {getUserVerificationImage} from '@spinach/next/controller/user/verification';
import {UserDataLoadingOpts} from '@spinach/next/types/userData/load';
import {UserLazyLoadedData} from '@spinach/next/types/userData/main';


type GetUserLazyDataOpts = {
  accountId: string,
  options: UserDataLoadingOpts,
};

const loadData = async ({options, accountId}: GetUserLazyDataOpts) => {
  const type = options.type;

  if (await isSuspended(accountId)) {
    return 'accountDisabled';
  }

  if (type === 'nftPosition') {
    const nftInfoOfPositions = await (await getNftPositionInfo(new ObjectId(accountId))).toArray();
    const nftInfoMap = toObject(
      nftInfoOfPositions,
      (nftInfo) => [nftInfo._id.toHexString(), nftInfo],
    );

    return await getNftListingData(
      nftInfoOfPositions.map(({_id}) => _id),
      nftInfoMap,
    ) satisfies UserLazyLoadedData['nftPosition'];
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

  if (type === 'globalConfig') {
    return await getGlobalConfig() satisfies UserLazyLoadedData['globalConfig'];
  }

  if (type === 'adminAgentList') {
    const agentMemberList = await getAccountMemberListByAgent({executorUserId: accountId});
    const [
      agentInfo,
      balanceActivityMap,
    ] = await Promise.all([
      getUserDataMap(agentMemberList.map(({agentId}) => agentId).filter(isNotNullish)),
      getUserBalanceActivityMap({
        executorUserId: accountId,
        userIdsToCheck: agentMemberList
          .flatMap(({agentId, members}) => [agentId, ...members.map(({id}) => id)])
          .filter(isNotNullish)
          .map((id) => new ObjectId(id)),
        ...options.opts,
      }),
    ]);

    return {
      agentMemberList,
      agentInfo,
      balanceActivityMap,
    } satisfies UserLazyLoadedData['adminAgentList'];
  }

  if (type === 'adminMemberList') {
    const [agent, members] = await Promise.all([
      getUserInfoById({
        executorUserId: accountId,
        requiresElevated: true,
        userId: options.opts.agentId,
      }),
      getUserInfoList({
        executorUserId: accountId,
        agentId: options.opts.agentId,
      }),
    ]);
    const balanceActivityMap = await getUserBalanceActivityMap({
      executorUserId: accountId,
      userIdsToCheck: members.map(({id}) => new ObjectId(id)),
      ...options.opts,
    });

    return {
      agent,
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

  if (type === 'adminExchangeTokenMap') {
    return await getNftExchangeTokenMap({
      executorUserId: accountId,
    }) satisfies UserLazyLoadedData['adminExchangeTokenMap'];
  }

  if (type === 'adminExchangeTokenGeneration') {
    return await generateNftExchangeToken({
      executorUserId: accountId,
      webhook: options.opts.webhook,
    }) satisfies UserLazyLoadedData['adminExchangeTokenGeneration'];
  }

  if (type === 'adminImageOfId') {
    const {userId, type} = options.opts;

    return await getUserVerificationImage({
      executorUserId: accountId,
      userId,
      type,
    }) satisfies UserLazyLoadedData['adminImageOfId'];
  }

  if (type === 'adminImageOfBankDetails') {
    return await getBankDetailsVerificationImageByUuid({
      executorUserId: accountId,
      uuid: options.opts.uuid,
    }) satisfies UserLazyLoadedData['adminImageOfBankDetails'];
  }

  if (type === 'adminImageOfGoldTxnTwBank') {
    return await getGoldPurchaseTwBankVerificationImage({
      executorUserId: accountId,
      uuid: options.opts.uuid,
    }) satisfies UserLazyLoadedData['adminImageOfGoldTxnTwBank'];
  }

  if (type === 'adminImageOfLimitedNft') {
    return await getLimitedNftProofImage({
      executorUserId: accountId,
      uuid: options.opts.uuid,
    }) satisfies UserLazyLoadedData['adminImageOfLimitedNft'];
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
