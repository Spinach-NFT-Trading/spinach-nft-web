import {isCi} from '@spinach/common/utils/env';
import * as env from 'env-var';


export const MongoUri = env.get('MONGODB_URI').required().asString();

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
