import {apiPath} from '@spinach/common/const/path';
import {
  UserLoginRequest,
  UserLoginRequestSchema,
  UserLoginResponse,
  UserLoginResponseSchema,
} from '@spinach/common/types/api/auth/login';

import {Server} from '@spinach/server/const';
import {getUserInfo} from '@spinach/server/controller/auth/main';


export const addAuthLogin = () => {
  Server.post<{Body: UserLoginRequest, Reply: UserLoginResponse}>(
    apiPath.auth.login,
    {
      schema: {
        body: UserLoginRequestSchema,
        response: {
          200: UserLoginResponseSchema,
        },
      },
    },
    async ({body}): Promise<UserLoginResponse> => {
      const data = await getUserInfo(body);

      if (typeof data === 'string') {
        return {
          success: false,
          error: data,
        };
      }

      return {success: true, data};
    },
  );
};
