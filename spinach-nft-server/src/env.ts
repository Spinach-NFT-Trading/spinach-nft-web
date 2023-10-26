import {isCi} from '@spinach/common/utils/env';
import * as env from 'env-var';


export const CorsAllowedOrigins = env.get('SPINACH_CORS_ORIGINS')
  .default('')
  .required(!isCi())
  .asArray();

export const LogDir = env.get('SPINACH_LOG_DIR')
  .default('')
  .required(!isCi())
  .asString();

export const ApiHost = env.get('SPINACH_API_HOST').required().asString();

export const ApiPort = env.get('SPINACH_API_PORT').required().asPortNumber();

export const SmsUsername = env.get('SPINACH_SMS_USERNAME').required().asString();

export const SmsPassword = env.get('SPINACH_SMS_PASSWORD').required().asString();

