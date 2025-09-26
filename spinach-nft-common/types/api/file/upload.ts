import {Static, Type} from '@sinclair/typebox';

import {generateApiFailableSchema} from '@spinach/common/utils/api/schema';


export const FileUploadResponseDataSchema = Type.Object(
  {
    uploadId: Type.String(),
  },
  {additionalProperties: false},
);

export const FileUploadResponseSchema = generateApiFailableSchema(FileUploadResponseDataSchema);

export type FileUploadResponse = Static<typeof FileUploadResponseSchema>;

