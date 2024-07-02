import {I18nMessageKeysOfNamespace} from '@spinach/next/types/i18n';
import {UserDataActionStatus} from '@spinach/next/types/userData/main';
import {GoldExchangeConfirmTwBankInput} from '@spinach/next/ui/gold/confirm/twBank/type';


export const goldExchangeUploadStatusI18nId: {
  [status in UserDataActionStatus]: I18nMessageKeysOfNamespace<'UI.InPage.Gold.Confirm.TwBank'>
} = {
  waiting: 'UploadStatus.Waiting',
  processing: 'UploadStatus.Processing',
  completed: 'UploadStatus.Completed',
  failed: 'UploadStatus.Failed',
};

export const goldExchangeTwBankInitialInput: GoldExchangeConfirmTwBankInput = {
  sourceBankDetailsUuid: null,
  txnProofImage: null,
  errorMessage: null,
  bankDetailsSearch: '',
};
