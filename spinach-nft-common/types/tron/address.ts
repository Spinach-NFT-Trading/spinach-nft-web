import {TrxErrorResponse} from '@spinach/common/types/tron/error';


// https://docs.tronscan.org/api-endpoints/account#find-the-address-if-exist-on-other-chain
export type TrxAddressCheckData = {
  isToken: boolean,
  isContract: boolean,
};

export type TrxAddressCheckResponse = TrxErrorResponse | TrxAddressCheckData;
