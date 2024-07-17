import {UserBalanceHistoryTxnType} from '@spinach/common/types/data/user/balance';

import {I18nMessageKeysOfNamespace} from '@spinach/next/types/i18n';


export const userBalanceHistoryTypeText: {
  [type in UserBalanceHistoryTxnType]: I18nMessageKeysOfNamespace<'UI.User.Balance.HistoryType'>
} = {
  'nftBuy': 'NftBuy',
  'nftSell': 'NftSell',
  'nftSellRefund': 'NftSellRefund',
  'deposit.twBank': 'DepositTwd',
  'deposit.twBank.cashback': 'DepositTwdCashback',
  'deposit.crypto': 'DepositCrypto',
  'deposit.crypto.cashback': 'DepositCryptoCashback',
};
