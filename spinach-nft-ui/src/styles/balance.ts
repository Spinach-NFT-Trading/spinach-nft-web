import {UserBalanceHistoryTxnType} from '@spinach/common/types/data/user/balance';
import {clsx} from 'clsx';


export const userBalanceHistoryTypeTextStyle: {[type in UserBalanceHistoryTxnType]: string} = {
  'nftBuy': clsx('text-green-300'),
  'nftBuyCommissionMember': clsx('text-lime-300'),
  'nftBuyCommissionAgent': clsx('text-emerald-300'),
  'nftSell': clsx('text-red-300'),
  'nftSellRefund': clsx('text-amber-300'),
  'nftSellCommissionMember': clsx('text-yellow-300'),
  'nftSellCommissionAgent': clsx('text-orange-300'),
  'deposit.twBank': clsx('text-sky-300'),
  'deposit.twBank.cashback': clsx('text-sky-300'),
  'deposit.crypto': clsx('text-sky-300'),
  'deposit.crypto.cashback': clsx('text-sky-300'),
  'adminAdjustment': clsx('text-purple-300'),
};
