import {BinaryData} from '@spinach/common/types/common/binary';
import {BankDetails} from '@spinach/common/types/data/user/bank';


export type AccountAddBankState = {
  errorMessage: string | null,
  data: {
    details: Omit<BankDetails, 'uuid'>,
    image: BinaryData | null,
  },
};
