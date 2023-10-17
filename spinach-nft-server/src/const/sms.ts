import {SendSmsMethod} from '@spinach/server/types/external/sms';


export const sendSmsMethodToId: {[method in SendSmsMethod]: number} = {
  instant: 1,
  scheduled: 2,
};
