'use server';
import {nftExchangeQueueCollection} from '@spinach/common/controller/collections/nft';

import {getDataAsArray} from '@spinach/next/controller/common';


export const getQueuedNftExchangeRequests = () => getDataAsArray(nftExchangeQueueCollection);
