import {apiPath} from '@spinach/common/const/path';
import {isAuthError} from '@spinach/common/types/api/auth/error';
import {
  UserRegisterRequest,
  UserRegisterRequestSchema,
  UserRegisterResponse,
  UserRegisterResponseSchema,
} from '@spinach/common/types/api/auth/register';

import {Server} from '@spinach/server/const';
import {registerUser} from '@spinach/server/controller/auth/main';


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
      const errorOrUserId = await registerUser(body);

      if (isAuthError(errorOrUserId)) {
        return {
          success: false,
          error: errorOrUserId,
        };
      }

      return {
        success: true,
        data: {
          id: errorOrUserId.toHexString(),
          name: body.name,
          email: body.email,
          username: body.username,
          phone: body.phone,
          lineId: body.lineId,
          wallet: body.wallet,
          bankDetails: [],
        },
      };
    },
  );
};
