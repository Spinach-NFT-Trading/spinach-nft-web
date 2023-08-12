import {currentFxCollection} from '@spinach/common/controller/fx';


type GetFxRateOpts = {
  market: string,
};

export const getFxRate = ({market}: GetFxRateOpts) => {
  return currentFxCollection.findOne({market});
};
