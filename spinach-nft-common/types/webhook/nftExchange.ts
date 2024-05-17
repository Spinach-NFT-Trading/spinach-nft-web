import {BankDetails} from '@spinach/common/types/data/user/bank';


export type NftExchangeRequestWebhookPayload = {
  requestUuid: string,
  amount: number,
  bankDetails: BankDetails[],
};
