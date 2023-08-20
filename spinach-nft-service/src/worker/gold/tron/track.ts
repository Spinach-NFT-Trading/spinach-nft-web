import {usdtContractInTrc20} from '@spinach/common/const/tron';

import {
  getLastTrackedTxnEpoch,
  getOwnedWallets,
  recordTxnCompleted,
  recordTxnTracked,
} from '@spinach/service/controller/gold/main';
import {recordBalanceDeposit} from '@spinach/service/controller/user/main';
import {getTrc20IncomingTxn} from '@spinach/service/worker/gold/tron/transfers';


const checkSingleWallet = async (wallet: string) => {
  let lastTrackedEpoch = undefined;

  while (true) {
    lastTrackedEpoch = await getLastTrackedTxnEpoch(wallet);
    const lastTrackedTimestamp = lastTrackedEpoch ? new Date(lastTrackedEpoch).toISOString() : '-';

    console.log(`Checking incoming TxN of TRON wallet: ${wallet} from ${lastTrackedTimestamp}`);
    const transfers = await getTrc20IncomingTxn({
      wallet,
      trc20Id: usdtContractInTrc20,
      startEpoch: lastTrackedEpoch,
    });

    const confirmedData = transfers.data.filter(({confirmed}) => confirmed === 1);
    const {trackedTxn, newTxnCount} = await recordTxnTracked(confirmedData);

    if (newTxnCount > 0) {
      const completedTxN = await recordTxnCompleted(trackedTxn);
      await recordBalanceDeposit(completedTxN);
    }

    if (newTxnCount === 0) {
      console.log(`Done checking wallet ${wallet}`);
      break;
    }

    console.log(`Detected ${newTxnCount} new TxN, rerunning TxN checks`);
  }
};

const checkWallets = async () => {
  return Promise.all((await getOwnedWallets()).map((wallet) => checkSingleWallet(wallet)));
};

export const trackTronWallet = () => {
  setInterval(() => {
    checkWallets().catch((err) => console.error('Failed to track TRON wallet', err));
  }, 10000);
};
