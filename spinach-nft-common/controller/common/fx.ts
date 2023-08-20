import {currentFxCollection} from '@spinach/common/controller/collections/fx';


export const getFxRate = async (market: string) => (await currentFxCollection.findOne({market}))?.px;
