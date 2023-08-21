import {TrxWalletTransferResponse} from '@spinach/common/types/tron/transfer';
import {tronGetRequest} from '@spinach/common/utils/tron/base';


type GetTrc20IncomingTxnOpts = {
  wallet: string,
  trc20Id: string,
  startEpoch: number | undefined,
};

export const getTrc20IncomingTxn = async ({wallet, trc20Id, startEpoch}: GetTrc20IncomingTxnOpts) => {
  const endpoint = 'https://apilist.tronscanapi.com/api/transfer/trc20?' + new URLSearchParams({
    address: wallet,
    start: startEpoch ? '0' : '',
    start_timestamp: startEpoch?.toString() ?? '',
    limit: '50', // Max 50
    trc20Id,
    direction: '2', // Incoming
    reverse: 'false', // Needs to be sorted by timestamp ASC, so the last timestamp is always the latest confirmed
  }).toString();

  const response = await tronGetRequest({endpoint});

  return (await response.json()) as TrxWalletTransferResponse;
};
