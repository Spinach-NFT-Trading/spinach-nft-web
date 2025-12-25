import {Static, TString, Type} from '@sinclair/typebox';


export const transactionSides = [
  'buy',
  'sell',
] as const;

interface TTransactionSide extends TString {
  static: typeof transactionSides[number],
}

export const TransactionSideSchema = Type.Unsafe<Static<TTransactionSide>>(Type.String({minLength: 1}));

export type TransactionSide = Static<typeof TransactionSideSchema>;
