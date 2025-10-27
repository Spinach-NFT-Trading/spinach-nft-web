import {addNftExchangeRequest} from '@spinach/server/route/nft/exchange';
import {addNftSellRequest} from '@spinach/server/route/nft/sell';


export const addNftControl = () => {
  addNftExchangeRequest();
  addNftSellRequest();
};
