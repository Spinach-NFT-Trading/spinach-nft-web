import {BankDetails} from '@spinach/common/types/data/user/bank';

import {FileRef} from '@spinach/next/types/input/fileRef';


export type AccountAddBankState = {
  errorMessage: string | null,
  imageFileRef: FileRef | null,
  data: {
    details: Omit<BankDetails, 'uuid' | 'imageUploadId'>,
  },
};
