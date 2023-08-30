import {NftInfoModel} from '@spinach/common/types/data/nft';


export type NftInfoMap = {[nftId in string]: NftInfoModel};

export type NftPriceMap = {[nftId in string]: number};
