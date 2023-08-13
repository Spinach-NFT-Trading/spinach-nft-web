import * as dotenv from 'dotenv';


dotenv.config({path: '.env.local', override: true});

import {trackFxRateOnMax} from '@spinach/service/worker/fx/main';


trackFxRateOnMax();
