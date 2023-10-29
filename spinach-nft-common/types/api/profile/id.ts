import {Static, Type} from '@sinclair/typebox';


export const accountIdVerificationType = [
  'idFront',
  'idBack',
  'handheld',
  'secondaryFront',
] as const;

export const AccountIdVerificationTypeSchema = Type.Union([
  // Needs to have the same literals of `accountIdVerificationType`
  Type.Literal('idFront'),
  Type.Literal('idBack'),
  Type.Literal('handheld'),
  Type.Literal('secondaryFront'),
]);

export type AccountIdVerificationType = Static<typeof AccountIdVerificationTypeSchema>;
