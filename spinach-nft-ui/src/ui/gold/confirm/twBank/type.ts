import {FileRef} from '@spinach/next/types/input/fileRef';


export type GoldExchangeConfirmTwBankInput = {
  sourceBankDetailsUuid: string | null,
  txnProofImageFileRef: FileRef | null,
  errorMessage: string | null,
  bankDetailsSearch: string,
};
