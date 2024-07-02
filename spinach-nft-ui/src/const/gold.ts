import {GoldExchangeChannel} from '@spinach/common/types/data/gold/common';

import {I18nMessageKeysOfNamespace} from '@spinach/next/types/i18n';


export const goldExchangeChannelI18nId: {
  [channel in GoldExchangeChannel]: I18nMessageKeysOfNamespace<'UI.Gold.ExchangeChannel'>
} = {
  crypto: 'Usdt',
  twBank: 'Twd',
};
