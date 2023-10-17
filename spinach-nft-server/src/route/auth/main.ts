import {addAuthLogin} from '@spinach/server/route/auth/login';
import {addAuthRegister} from '@spinach/server/route/auth/register';
import {addSmsVerifyFinalize} from '@spinach/server/route/auth/verify/sms/finalize';
import {addSmsVerifyInitial} from '@spinach/server/route/auth/verify/sms/initial';


export const addAuth = () => {
  addAuthLogin();
  addAuthRegister();
  addSmsVerifyInitial();
  addSmsVerifyFinalize();
};
