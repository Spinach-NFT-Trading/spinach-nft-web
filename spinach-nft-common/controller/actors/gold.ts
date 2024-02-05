import {txnWalletCollection} from '@spinach/common/controller/collections/gold';
import {isNotNullish} from '@spinach/common/utils/type';


export const getOwnedCryptoWallets = async (): Promise<string[]> => {
  return (await txnWalletCollection.find({channel: 'crypto'}, {projection: {_id: false}})
    .map((wallet) => {
      if (wallet.channel !== 'crypto') {
        return null;
      }

      return wallet.wallet;
    })
    .toArray())
    .filter(isNotNullish);
};
