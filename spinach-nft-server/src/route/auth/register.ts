import {apiPath} from '@spinach/common/const/path';
import {
  UserRegisterRequest,
  UserRegisterRequestSchema,
  UserRegisterResponse,
  UserRegisterResponseSchema,
} from '@spinach/common/types/api/auth/register';
import {isApiError} from '@spinach/common/types/api/error';

import {Server} from '@spinach/server/const';
import {registerUser} from '@spinach/server/controller/auth/user';
import {isIdNumberValid} from '@spinach/server/utils/id';


export const addAuthRegister = () => {
  Server.post<{Body: UserRegisterRequest, Reply: UserRegisterResponse}>(
    apiPath.auth.register,
    {
      schema: {
        hide: true,
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

      return {
        success: true,
        data: null,
      };
    },
  );
};
