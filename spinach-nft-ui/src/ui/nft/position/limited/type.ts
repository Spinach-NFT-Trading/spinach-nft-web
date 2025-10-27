export const nftPositionLimitedTabs = [
  'pending',
  'completed',
] as const;

export type NftPositionLimitedTab = typeof nftPositionLimitedTabs[number];

