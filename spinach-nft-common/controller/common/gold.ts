import {txnWalletCollection} from '@spinach/common/controller/collections/gold';


export const getOwnedWallets = async () => {
  return txnWalletCollection.find({}, {projection: {_id: false}}).map(({wallet}) => wallet).toArray();
};
