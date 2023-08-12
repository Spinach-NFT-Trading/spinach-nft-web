import {addAuthLogin} from '@spinach/server/route/auth/login';
import {addAuthRegister} from '@spinach/server/route/auth/register';


export const addAuth = () => {
  addAuthLogin();
  addAuthRegister();
};
