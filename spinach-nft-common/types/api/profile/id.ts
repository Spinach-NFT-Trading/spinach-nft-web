import {Static, Type} from '@sinclair/typebox';


export const accountIdVerificationType = [
  'idFront',
  'idBack',
  'handheld',
  'secondaryFront',
] as const;

export const AccountIdVerificationTypeSchema = Type.Union(
  accountIdVerificationType.map((type) => Type.Literal(type)),
);

export type AccountIdVerificationType = Static<typeof AccountIdVerificationTypeSchema>;
