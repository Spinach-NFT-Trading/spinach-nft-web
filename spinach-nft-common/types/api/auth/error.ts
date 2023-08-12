import {Static, TString, Type} from '@sinclair/typebox';


export const authErrorCode = [
  'accountNotFound',
  'passwordMismatch',
  'takenUsername',
  'takenName',
  'takenEmail',
  'takenPhone',
  'takenLineId',
  'takenWallet',
] as const;

export interface TAuthErrorCode extends TString {
  static: typeof authErrorCode[number];
}

export const AuthErrorCodeSchema = Type.Unsafe<Static<TAuthErrorCode>>(Type.String({minLength: 1}));

export type AuthErrorCode = Static<typeof AuthErrorCodeSchema>;

export const isAuthError = (error: unknown): error is AuthErrorCode => {
  return authErrorCode.includes(error as AuthErrorCode);
};
