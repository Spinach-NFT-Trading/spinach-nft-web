import {Static, TString, Type} from '@sinclair/typebox';


export const authErrorCode = [
  'accountNotFound',
] as const;

export interface TAuthErrorCode extends TString {
  static: typeof authErrorCode[number];
}

export const AuthErrorCodeSchema = Type.Unsafe<Static<TAuthErrorCode>>(Type.String({minLength: 1}));

export type AuthErrorCode = Static<typeof AuthErrorCodeSchema>;

export const isAuthError = (error: string): error is AuthErrorCode => {
  return authErrorCode.includes(error as AuthErrorCode);
};
