import {usdtContractInTrc20} from '@spinach/common/const/tron';
import {getOwnedWallets} from '@spinach/common/controller/actors/gold';
import {sleep} from '@spinach/common/utils/execution';
import {getTrc20IncomingTxn} from '@spinach/common/utils/tron/transfers';

import {getLastTrackedTxnEpoch, recordTxnCompleted, recordTxnTracked} from '@spinach/service/controller/gold/main';
import {recordBalanceAfterDeposit} from '@spinach/service/controller/user/main';


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

    if ('message' in transfers) {
      console.error(`Error checking wallet ${wallet} - ${transfers.message}`);
      return;
    }

    const confirmedData = transfers.data.filter(({confirmed}) => confirmed === 1);
    const {trackedTxn, newTxnCount} = await recordTxnTracked(confirmedData);

    if (newTxnCount > 0) {
      const completedTxN = await recordTxnCompleted(trackedTxn);
      await recordBalanceAfterDeposit(completedTxN);
    }

    if (newTxnCount === 0) {
      console.log(`Done checking wallet ${wallet}`);
      break;
    }

    console.log(`Detected ${newTxnCount} new TxN, rerunning TxN checks`);
    await sleep(500); // Avoid hitting Tronscan reading rate limit
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
