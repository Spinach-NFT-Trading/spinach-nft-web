import {AuthErrorCode} from 'spinach-nft-common/types/api/auth/error';


export type LoginPageParams = {
  params: {},
  searchParams: {
    error?: AuthErrorCode,
    callbackUrl?: string,
  },
};
