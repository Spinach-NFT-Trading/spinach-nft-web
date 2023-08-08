import * as env from 'env-var';


export const isCi = (): boolean => env.get('CI').asBool() ?? false;

export const isProduction = (): boolean => process.env.NODE_ENV === 'production';

export const getEnvironment = (): string => isProduction() ? 'Production' : 'Development';
