import {txnWalletCollection} from '@spinach/common/controller/collections/txn';
import {GoldExchangeChannel} from '@spinach/common/types/data/gold/common';
import {GoldWallet, GoldWalletClient, GoldWalletClientMap} from '@spinach/common/types/data/gold/wallet';
import {ObjectId, WithId} from 'mongodb';


const toGoldWalletClient = (wallet: WithId<GoldWallet>): GoldWalletClient => {
  const {_id, ...walletContent} = wallet;

  return {
    ...walletContent,
    id: wallet._id.toHexString(),
  };
};

export const getDepositWallet = async (channel: GoldExchangeChannel): Promise<GoldWalletClient | null> => {
  const wallet = await txnWalletCollection.findOne({channel});
  if (!wallet) {
    return null;
  }

  return toGoldWalletClient(wallet);
};

export const getWalletClientMap = async (idList: string[]): Promise<GoldWalletClientMap> => {
  return Object.fromEntries((await txnWalletCollection
    .find({_id: {$in: idList.map((id) => new ObjectId(id))}})
    .toArray())
    .map((data) => [data._id.toHexString(), toGoldWalletClient(data)]));
};
