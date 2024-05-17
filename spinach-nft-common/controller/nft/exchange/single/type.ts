import {BankDetails} from '@spinach/common/types/data/user/bank';
import {UserNftPositionModel} from '@spinach/common/types/data/user/nftPosition';


export type RequestNftExchangeResult = {
  nftSold: UserNftPositionModel,
  bankDetails: BankDetails[],
};
