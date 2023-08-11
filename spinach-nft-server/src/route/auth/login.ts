import {apiPath} from 'spinach-nft-common/const/path';
import {
  UserLoginRequest,
  UserLoginRequestSchema,
  UserLoginResponse,
  UserLoginResponseSchema,
} from 'spinach-nft-common/types/api/auth/login';

import {Server} from '@/const';
import {getUserInfo} from '@/controller/auth/main';


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
