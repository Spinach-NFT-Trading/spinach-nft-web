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

// This should be used only for downloading the file from the server (server -> client),
// but not client to server.
// iOS (again) would have issues uploading the file to the server.
// For uploading files from client to server, use `FormData` instead.
export type BinaryData = Static<typeof BinaryDataSchema>;
