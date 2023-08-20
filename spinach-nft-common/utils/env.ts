import * as env from 'env-var';


export const isCi = (): boolean => env.get('CI').asBool() ?? false;

export const isProduction = (): boolean => env.get('NODE_ENV').asString() === 'production';

export const getEnvironment = (): string => isProduction() ? 'Production' : 'Development';
