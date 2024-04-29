import {UserBalanceHistoryTxnType} from '@spinach/common/types/data/user/balance';


export const userBalanceHistoryTypeTextStyle: {[type in UserBalanceHistoryTxnType]: string} = {
  'nftBuy': 'text-green-300',
  'nftSell': 'text-red-300',
  'deposit.twBank': 'text-sky-300',
  'deposit.twBank.cashback': 'text-sky-300',
  'deposit.crypto': 'text-sky-300',
  'deposit.crypto.cashback': 'text-sky-300',
};
