import {UserDataMap} from '@spinach/common/types/common/user/data';
import {NftLimitedPendingModelClient} from '@spinach/common/types/data/nft/limited';

import {NftInfoMap, NftTxnModelClient} from '@spinach/next/types/mongo/nft';
import {AdminVerifyFilterData, AdminVerifyInput} from '@spinach/next/ui/admin/verify/common/type';


export const adminVerifyLimitedNftFilterBasis = [
  'username',
  'name',
] as const;

export type AdminVerifyLimitedNftFilterBasis = typeof adminVerifyLimitedNftFilterBasis[number];

export type AdminVerifyLimitedNftFilterData = AdminVerifyFilterData<AdminVerifyLimitedNftFilterBasis>;

export type AdminVerifyLimitedNftFilterInput = AdminVerifyInput<AdminVerifyLimitedNftFilterBasis>;

export type AdminVerifyLimitedNftData = {
  userDataMap: UserDataMap,
  nftInfoMap: NftInfoMap,
  nftTxnMap: {[nftTxnId in string]?: NftTxnModelClient},
  pending: NftLimitedPendingModelClient[],
};
