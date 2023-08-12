import * as dotenv from 'dotenv';


dotenv.config({path: '.env.local', override: true});

import {maxTrackUsdtTwd} from '@spinach/service/worker/fx/main';


maxTrackUsdtTwd();
