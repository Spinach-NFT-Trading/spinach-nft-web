import {TrxWalletTransferResponse} from '@spinach/service/type/tron/transfer';
import {tronGetRequest} from '@spinach/service/worker/gold/tron/base';


type GetTrc20IncomingTxnOpts = {
  wallet: string,
  trc20Id: string,
  startEpoch: number | undefined,
};

export const getTrc20IncomingTxn = async ({wallet, trc20Id, startEpoch}: GetTrc20IncomingTxnOpts) => {
  const response = await tronGetRequest({
    endpoint: 'https://apilist.tronscanapi.com/api/transfer/trc20?' + new URLSearchParams({
      address: wallet,
      start: startEpoch ? '0' : '',
      start_timestamp: startEpoch?.toString() ?? '',
      limit: '50', // Max 50
      trc20Id,
      direction: '2', // Incoming
    }).toString(),
  });

  return (await response.json()) as TrxWalletTransferResponse;
};
