import {Static, TString, Type} from '@sinclair/typebox';


export const apiErrorCode = [
  'accountNotFound',
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
  'walletInvalid',
  'walletNotExist',
  'smsAlreadyRequested',
  'smsSendFailed',
  'smsPhoneInvalid',
  'smsPhoneUsed',
  'smsCodeInvalid',
  'idNumberInvalid',
  'bankDetailsAlreadyExist',
  'bankDetailsUploadFailed',
  'bankDetailsNotFound',
  'commissionOverLimit',
] as const;

export interface TApiErrorCode extends TString {
  static: typeof apiErrorCode[number];
}

export const ApiErrorCodeSchema = Type.Unsafe<Static<TApiErrorCode>>(Type.String({minLength: 1}));

export type ApiErrorCode = Static<typeof ApiErrorCodeSchema>;

export const isApiError = (error: unknown): error is ApiErrorCode => {
  return apiErrorCode.includes(error as ApiErrorCode);
};
