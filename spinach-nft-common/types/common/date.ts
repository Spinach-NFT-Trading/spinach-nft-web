import {Static, TString, Type} from '@sinclair/typebox';


export interface TIsoDateString extends TString {
  static: `${number}-${number}-${number}`,
}

export const IsoDateStringSchema = Type.Unsafe<Static<TIsoDateString>>(
  Type.String({format: 'date'}),
);

export type IsoDateString = Static<typeof IsoDateStringSchema>;

export type DateDelta = {
  day: number,
};
