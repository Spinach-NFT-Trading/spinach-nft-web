import {GoldWalletClient} from '@spinach/common/types/data/gold/wallet';

import {formatBankDetails} from '@spinach/next/utils/data/user';


export const formatWallet = (wallet: GoldWalletClient): string => {
  const channel = wallet.channel;

  if (channel === 'crypto') {
    return wallet.wallet;
  }

  if (channel === 'twBank') {
    return formatBankDetails(wallet);
  }

  throw new Error(`Unhandled wallet channel [${channel satisfies never}]`);
};
