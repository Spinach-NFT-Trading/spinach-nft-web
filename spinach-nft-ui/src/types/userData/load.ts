export type UserDataLoadingOpts = {
  type: 'nftPosition',
};

export type UserDataLoader = (options: UserDataLoadingOpts) => void;
