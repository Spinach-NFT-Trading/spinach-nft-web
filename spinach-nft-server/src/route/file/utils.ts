import {MultipartFields} from '@fastify/multipart';
import {activateFileUploadGrant} from '@spinach/common/controller/actors/fileUpload';
import {ApiErrorCode} from '@spinach/common/types/api/error';
import {ValueOf} from '@spinach/common/types/common/typing';

import {getMultipartValueAsString} from '@spinach/server/utils/multipart/value';


type ValidateFileUploadGrantOpts = {
  multipart: ValueOf<MultipartFields>,
};

export const validateFileUploadGrant = async ({
  multipart,
}: ValidateFileUploadGrantOpts): Promise<ApiErrorCode | null> => {
  const grantOrApiErrorCode = getMultipartValueAsString({multipart});
  if (typeof grantOrApiErrorCode === 'string') {
    return grantOrApiErrorCode;
  }

  const activated = await activateFileUploadGrant(grantOrApiErrorCode.casted);
  if (!activated) {
    return 'fileUploadGrantActivationFailed';
  }

  return null;
};
