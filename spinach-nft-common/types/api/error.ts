import {Static, Type} from '@sinclair/typebox';

import {BoolFalseSchema} from '@spinach/common/types/typebox';


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
  'nftUnverifiedLimitedNotFound',
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
  'userInfoNotFound',
  'unauthorized',
] as const;

export const ApiErrorCodeSchema = Type.Union(
  apiErrorCode.map((code) => Type.Literal(code)),
);

export type ApiErrorCode = Static<typeof ApiErrorCodeSchema>;

export const ApiErrorResponseSchema = Type.Object(
  {
    success: BoolFalseSchema,
    error: ApiErrorCodeSchema,
  },
  {additionalProperties: false},
);

export const isApiError = (error: unknown): error is ApiErrorCode => {
  return apiErrorCode.includes(error as ApiErrorCode);
};
