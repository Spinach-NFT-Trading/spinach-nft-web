import {Static, Type} from '@sinclair/typebox';


export const CurrentFxSchema = Type.Object(
  {
    market: Type.String(),
    px: Type.String({pattern: '[0-9]+\.[0-9]*'}),
    lastUpdateEpoch: Type.Integer({minimum: 0}),
  },
  {additionalProperties: false},
);

export type CurrentFx = Static<typeof CurrentFxSchema>;
