import {Static, Type} from '@sinclair/typebox';


export const NftSchema = Type.Object({
  id: Type.String({pattern: '^[a-f\\d]{24}$'}),
  price: Type.Integer({minimum: 0}),
  image: Type.String({format: 'uri'}),
});

export type Nft = Static<typeof NftSchema>;
