import {GoldExchangeChannel} from '@spinach/common/types/data/gold/common';


export type GlobalCashbackPercent = {[channel in GoldExchangeChannel]: number};

export type GlobalConfig = {
  cashbackPercent: GlobalCashbackPercent,
  thirdPartyCommissionPercent: number,
};
