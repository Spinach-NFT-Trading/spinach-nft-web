import * as env from 'env-var';


export const MaxAccessKey = env.get('SPINACH_MAX_ACCESS_KEY').required().asString();

export const MaxSecretKey = env.get('SPINACH_MAX_SECRET_KEY').required().asString();

export const nftOnSaleMinimum = env.get('SPINACH_NFT_ON_SALE_MINIMUM').required().asIntPositive();
