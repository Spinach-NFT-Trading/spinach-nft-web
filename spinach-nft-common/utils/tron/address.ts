import {TrxAddressCheckResponse} from '@spinach/common/types/tron/address';
import {tronGetRequest} from '@spinach/common/utils/tron/base';


type CheckTrxAddressOpts = {
  wallet: string,
};

export const checkTrxAddress = async ({wallet}: CheckTrxAddressOpts) => {
  const endpoint = 'https://apilist.tronscanapi.com/api/multiple/chain/query?' + new URLSearchParams({
    address: wallet,
  }).toString();

  return await (await tronGetRequest({endpoint})).json() as TrxAddressCheckResponse;
};
