import * as dotenv from 'dotenv';


dotenv.config({path: '.env.local', override: true});

import {trackFxRateOnMax} from '@spinach/service/worker/fx/main';
import {trackTronWallet} from '@spinach/service/worker/gold/main';


trackFxRateOnMax();
trackTronWallet();
