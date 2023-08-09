import {addAuthLogin} from '@/route/auth/login';
import {addAuthRegister} from '@/route/auth/register';


export const addAuth = () => {
  addAuthLogin();
  addAuthRegister();
};
