import {ApiErrorCode} from '@spinach/common/types/api/error';

import {I18nMessageKeysOfNamespace} from '@spinach/next/types/i18n';


export const apiErrorI18nId: {[code in ApiErrorCode]: I18nMessageKeysOfNamespace<'UI.Error.Api'>} = {
  accountNotFound: 'AccountNotFound',
  accountDisabled: 'AccountDisabled',
  agentNotFound: 'AgentNotFound',
  agentInactive: 'AgentInactive',
  passwordMismatch: 'PasswordMismatch',
  takenIdNumber: 'TakenIdNumber',
  takenEmail: 'TakenEmail',
  takenLineId: 'TakenLineId',
  takenName: 'TakenName',
  takenUsername: 'TakenUsername',
  takenWallet: 'TakenWallet',
  goldExchangeInProgress: 'GoldExchangeInProgress',
  goldNotEnough: 'GoldNotEnough',
  goldTwBankTxnRecordFailed: 'GoldTwBankTxnRecordFailed',
  goldTwBankTxnNotFound: 'GoldTwBankTxnNotFound',
  nftNotOnSale: 'NftNotOnSale',
  nftMatchRequestNotFound: 'NftMatchRequestNotFound',
  nftInfoNotFound: 'NftInfoNotFound',
  walletInvalid: 'WalletInvalid',
  walletNotExist: 'WalletNotExist',
  smsSendFailed: 'SmsSendFailed',
  smsAlreadyRequested: 'SmsAlreadyRequested',
  smsPhoneInvalid: 'SmsPhoneInvalid',
  smsPhoneUsed: 'SmsPhoneUsed',
  smsPhoneRegistered: 'SmsPhoneRegistered',
  smsCodeInvalid: 'SmsCodeInvalid',
  idNumberInvalid: 'IdNumberInvalid',
  bankDetailsNotFound: 'BankDetailsNotFound',
  bankDetailsAlreadyExist: 'BankDetailsAlreadyExist',
  bankDetailsUploadFailed: 'BankDetailsUploadFailed',
  commissionOverLimit: 'CommissionOverLimit',
};
