import * as dotenv from 'dotenv';


dotenv.config();

import {trackFxRateOnMax} from '@spinach/service/worker/fx/main';
import {trackTronWallet} from '@spinach/service/worker/gold/tron/track';
import {scheduleQueuedNftExchangeRequestPeriodicCheck} from '@spinach/service/worker/nft/exchangeRequests/main';
import {ensureNftInventoryCompleteness} from '@spinach/service/worker/nft/inventory/main';


trackFxRateOnMax();
trackTronWallet();
ensureNftInventoryCompleteness();
scheduleQueuedNftExchangeRequestPeriodicCheck();
