export type UserDataLoadingOpts = {
  type: 'nftPosition',
} | {
  type: 'userInfo',
};

export type UserDataLoader = (options: UserDataLoadingOpts) => void;
