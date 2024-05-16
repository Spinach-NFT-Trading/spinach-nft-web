import {addAuth} from '@spinach/server/route/auth/main';
import {addNftControl} from '@spinach/server/route/nft/main';


export const addRoutes = () => {
  addAuth();
  addNftControl();
};
