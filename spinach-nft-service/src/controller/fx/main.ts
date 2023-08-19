import {currentFxCollection} from '@spinach/common/controller/fx';
import {CurrentFx} from '@spinach/common/types/data/fx';


export const updateFxRate = ({market, px, lastUpdateEpoch}: CurrentFx) => {
  return currentFxCollection.updateOne(
    {market},
    {$set: {px, lastUpdateEpoch}},
    {upsert: true},
  );
};

export const getFxRate = async (market: string) => (await currentFxCollection.findOne({market}))?.px;
