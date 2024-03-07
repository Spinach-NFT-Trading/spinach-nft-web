import {apiPath} from '@spinach/common/const/path';
import {uploadBlob} from '@spinach/common/controller/blob/upload';
import {
  UserRegisterRequest,
  UserRegisterRequestSchema,
  UserRegisterResponse,
  UserRegisterResponseSchema,
} from '@spinach/common/types/api/auth/register';
import {isApiError} from '@spinach/common/types/api/error';
import {AccountIdVerificationType, accountIdVerificationType} from '@spinach/common/types/api/profile/id';

import {Server} from '@spinach/server/const';
import {registerUser} from '@spinach/server/controller/auth/user';
import {isIdNumberValid} from '@spinach/server/utils/id';


type UploadIdImageOpts = {
  request: UserRegisterRequest,
  id: string,
  type: AccountIdVerificationType,
};

export const uploadIdImage = ({request, id, type}: UploadIdImageOpts) => {
  const data = request.image[type];

  if (!data) {
    console.error(`User of ID ${id} needs to re-upload the image of [${type}] (content is empty)`);
    return;
  }

  return uploadBlob({
    container: type,
    name: id,
    ...data,
  });
};

export const addAuthRegister = () => {
  Server.post<{Body: UserRegisterRequest, Reply: UserRegisterResponse}>(
    apiPath.auth.register,
    {
      schema: {
        body: UserRegisterRequestSchema,
        response: {
          200: UserRegisterResponseSchema,
        },
      },
    },
    async ({body}): Promise<UserRegisterResponse> => {
      if (!isIdNumberValid(body.idNumber)) {
        return {
          success: false,
          error: 'idNumberInvalid',
        };
      }

      const errorOrUserId = await registerUser(body);

      if (isApiError(errorOrUserId)) {
        return {
          success: false,
          error: errorOrUserId,
        };
      }

      const id = errorOrUserId.id.toHexString();
      await Promise.all(accountIdVerificationType.map((type) => uploadIdImage({
        request: body,
        id,
        type,
      })));

      const {
        idNumber,
        name,
        email,
        username,
        birthday,
        lineId,
        wallet,
        phone,
        status,
        isAdmin,
        isMod,
        isAgent,
        isSuspended,
        commissionRate,
        recruitedBy,
      } = errorOrUserId.model;

      return {
        success: true,
        data: {
          id,
          idNumber,
          name,
          email,
          username,
          birthday,
          lineId,
          wallet,
          phone,
          status,
          isAdmin,
          isMod,
          isAgent,
          isSuspended,
          commissionRate,
          recruitedBy,
        },
      };
    },
  );
};
