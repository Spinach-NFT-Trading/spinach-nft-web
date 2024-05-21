import {UserBalanceHistoryTxnType} from '@spinach/common/types/data/user/balance';


export const userBalanceHistoryTypeText: {[type in UserBalanceHistoryTxnType]: string} = {
  'nftBuy': '購買 NFT',
  'nftSell': '販賣 NFT',
  'nftSellRefund': '販賣 NFT (退差價)',
  'deposit.twBank': '入金 (台幣)',
  'deposit.twBank.cashback': '入金贈金 (台幣)',
  'deposit.crypto': '入金 (USDT)',
  'deposit.crypto.cashback': '入金贈金 (USDT)',
};
