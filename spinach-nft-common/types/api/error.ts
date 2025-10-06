import {Static, TString, Type} from '@sinclair/typebox';


export const apiErrorCode = [
  'accountNotFound',
  'accountDisabled',
  'agentNotFound',
  'agentInactive',
  'passwordMismatch',
  'takenIdNumber',
  'takenUsername',
  'takenName',
  'takenEmail',
  'takenLineId',
  'takenWallet',
  'goldExchangeInProgress',
  'goldNotEnough',
  'goldTwBankTxnRecordFailed',
  'goldTwBankTxnNotFound',
  'nftNotOnSale',
  'nftInfoNotFound',
  'nftMatchRequestNotFound',
  'walletInvalid',
  'walletNotExist',
  'smsAlreadyRequested',
  'smsSendFailed',
  'smsPhoneInvalid',
  'smsPhoneUsed',
  'smsPhoneRegistered',
  'smsCodeInvalid',
  'idNumberInvalid',
  'bankDetailsAlreadyExist',
  'bankDetailsUploadFailed',
  'bankDetailsNotFound',
  'commissionOverLimit',
  'multipartTooManyValues',
  'multipartFieldEmpty',
  'multipartFieldNotValue',
  'multipartFieldValueCastFailed',
  'fileUploadGrantActivationFailed',
  'fileUploadMissingFile',
  'fileUploadMissingContentType',
] as const;

export interface TApiErrorCode extends TString {
  static: typeof apiErrorCode[number];
}

export const ApiErrorCodeSchema = Type.Unsafe<Static<TApiErrorCode>>(Type.String({minLength: 1}));

export type ApiErrorCode = Static<typeof ApiErrorCodeSchema>;

export const isApiError = (error: unknown): error is ApiErrorCode => {
  return apiErrorCode.includes(error as ApiErrorCode);
};
