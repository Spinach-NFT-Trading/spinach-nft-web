import {GoldWalletTwBankClient} from '@spinach/common/types/data/gold/wallet';


export type GoldExchangeConfirmTwBankClientCommonProps = {
  fileUploadGrantId: string,
  wallet: GoldWalletTwBankClient,
  amount: number | null,
};
