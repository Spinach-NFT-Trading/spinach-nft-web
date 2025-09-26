import {addAuth} from '@spinach/server/route/auth/main';
import {addFileUploadControl} from '@spinach/server/route/file/main';
import {addNftControl} from '@spinach/server/route/nft/main';


export const addRoutes = () => {
  addAuth();
  addNftControl();
  addFileUploadControl();
};
