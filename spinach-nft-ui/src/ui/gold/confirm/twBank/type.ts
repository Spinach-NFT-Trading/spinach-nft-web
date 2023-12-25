import {BinaryData} from '@spinach/common/types/common/binary';


export type GoldExchangeConfirmTwBankInput = {
  sourceBankDetailsUuid: string | null,
  txnProofImage: BinaryData | null,
  errorMessage: string | null,
  bankDetailsSearch: string,
};
