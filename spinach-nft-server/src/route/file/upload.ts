import {fileUploadFormFieldNames} from '@spinach/common/const/api';
import {apiPath} from '@spinach/common/const/path';
import {azureContainer} from '@spinach/common/controller/blob/const';
import {uploadBlobBuffer} from '@spinach/common/controller/blob/upload';
import {FileUploadResponse, FileUploadResponseSchema} from '@spinach/common/types/api/file/upload';
import {v7} from 'uuid';

import {Server} from '@spinach/server/const';
import {validateFileUploadGrant} from '@spinach/server/route/file/utils';


export const addFileUploadAction = () => {
  Server.post<{Reply: FileUploadResponse}>(
    apiPath.file.upload,
    {
      schema: {
        response: {
          200: FileUploadResponseSchema,
        },
      },
    },
    async (request, reply): Promise<FileUploadResponse> => {
      // Set to 400 indicating error, only set to 200 when all processing has passed.
      reply.code(400);

      let bufferToUpload: Buffer | null = null;
      for await (const part of request.parts()) {
        if (part.type === 'field' && part.fieldname === fileUploadFormFieldNames.grant) {
          // Handle file upload grant
          const maybeGrantValidationError = await validateFileUploadGrant({
            multipart: part,
          });
          if (typeof maybeGrantValidationError === 'string') {
            return {success: false, error: maybeGrantValidationError};
          }
        } else if (part.type === 'file' && part.fieldname === fileUploadFormFieldNames.file) {
          // Handle file buffer upload
          bufferToUpload = await part.toBuffer();
        }
      }

      if (bufferToUpload == null) {
        return {success: false, error: 'fileUploadMissingFile'};
      }

      const uploadId = v7();

      await uploadBlobBuffer({
        buffer: bufferToUpload,
        container: azureContainer.pool,
        name: uploadId,
      });

      reply.code(200);
      return {success: true, data: {uploadId}};
    },
  );
};
