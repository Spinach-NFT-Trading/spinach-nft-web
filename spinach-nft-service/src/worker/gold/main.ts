import {usdtContractInTrc20} from '@spinach/common/const/tron';

import {
  getLastTrackedTxnEpoch,
  getOwnedWallets,
  recordTxnCompleted,
  recordTxnTracked,
} from '@spinach/service/controller/gold/main';
import {getTrc20IncomingTxn} from '@spinach/service/worker/gold/tron/transfers';


const trackWallets = async () => {
  for (const wallet of await getOwnedWallets()) {
    const startEpoch = await getLastTrackedTxnEpoch();

    console.log(
      `Tracking incoming TxN of TRON wallet: ${wallet} from ${startEpoch ? new Date(startEpoch).toISOString() : '-'}`,
    );
    const transfers = await getTrc20IncomingTxn({
      wallet,
      trc20Id: usdtContractInTrc20,
      startEpoch,
    });

    const confirmedData = transfers.data.filter(({confirmed}) => confirmed === 1);
    const trackedTxn = await recordTxnTracked(confirmedData);
    await recordTxnCompleted(trackedTxn); // Record completed, also update account value in `user.wallet`
  }
};

export const trackTronWallet = () => {
  setInterval(() => {
    trackWallets().catch((err) => console.error('Failed to track TRON wallet', err));
  }, 10000);
};
