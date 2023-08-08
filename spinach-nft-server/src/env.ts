import * as env from 'env-var';
import {isCi} from 'spinach-nft-common/utils/env';


export const MongoUri = env.get('MONGODB_URI').required().asString();

export const CorsAllowedOrigins = env.get('SPINACH_CORS_ORIGINS')
  .default('')
  .required(!isCi())
  .asArray();

export const LogDir = env.get('SPINACH_LOG_DIR').required().asString();

export const ApiHost = env.get('SPINACH_API_HOST').required().asString();

export const ApiPort = env.get('SPINACH_API_PORT').required().asPortNumber();
