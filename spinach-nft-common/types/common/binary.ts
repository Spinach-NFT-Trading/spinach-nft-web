import {Static, Type} from '@sinclair/typebox';

import {MimeTypesOfImageSchema} from '@spinach/common/types/common/mime';


export const ByteArraySchema = Type.Array(Type.Integer({minimum: 0, maximum: 255}));

export type ByteArray = Static<typeof ByteArraySchema>;

export const BinaryDataSchema = Type.Object(
  {
    contentType: MimeTypesOfImageSchema,
    data: ByteArraySchema,
  },
  {additionalProperties: false},
);

export type BinaryData = Static<typeof BinaryDataSchema>;
