import {
  NftLimitedPendingModelClient,
  NftLimitedUnverifiedModelClient,
} from '@spinach/common/types/data/nft/limited';

import {NftListingData} from '@spinach/next/types/nft';


export const nftPositionLimitedTabs = [
  'unverified',
  'pending',
] as const;

export type NftPositionLimitedTab = typeof nftPositionLimitedTabs[number];

export type NftPositionLimitedData = {
  unverified: NftLimitedUnverifiedModelClient[],
  pending: NftLimitedPendingModelClient[],
  nftListingMap: {[nftId: string]: NftListingData | undefined},
};
