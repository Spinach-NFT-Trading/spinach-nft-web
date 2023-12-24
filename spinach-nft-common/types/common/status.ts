import {Static, Type} from '@sinclair/typebox';


export const VerificationStatusSchema = Type.Union([
  Type.Literal('verified'),
  Type.Literal('unverified'),
  Type.Literal('rejected'),
]);

export type VerificationStatus = Static<typeof VerificationStatusSchema>;
