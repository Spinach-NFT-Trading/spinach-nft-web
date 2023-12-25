import {txnWalletCollection} from '@spinach/common/controller/collections/gold';
import {GoldExchangeChannel} from '@spinach/common/types/data/gold/common';
import {GoldWalletClient} from '@spinach/common/types/data/gold/wallet';


export const getDepositWallet = async (channel: GoldExchangeChannel): Promise<GoldWalletClient | null> => {
  const wallet = await txnWalletCollection.findOne({channel});
  if (!wallet) {
    return null;
  }

  const {_id, ...walletContent} = wallet;

  return {
    ...walletContent,
    id: wallet._id.toHexString(),
  };
};
