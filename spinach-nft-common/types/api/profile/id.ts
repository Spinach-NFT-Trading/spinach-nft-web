import {Static, TString, Type} from '@sinclair/typebox';


export const accountIdVerificationType = [
  'idFront',
  'idBack',
  'handheld',
  'secondaryFront',
] as const;

export interface TAccountIdVerificationType extends TString {
  static: typeof accountIdVerificationType[number];
}

export const AccountIdVerificationTypeSchema = Type.Unsafe<Static<TAccountIdVerificationType>>(Type.String({
  pattern: accountIdVerificationType.join('|'),
}));

export type AccountIdVerificationType = Static<typeof AccountIdVerificationTypeSchema>;
