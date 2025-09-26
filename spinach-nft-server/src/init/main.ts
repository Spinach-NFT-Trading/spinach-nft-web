import {registerServerPlugins} from '@spinach/server/init/plugin';
import {addRoutes} from '@spinach/server/route/main';


export const initApp = async () => {
  await registerServerPlugins();
  addRoutes();
};
