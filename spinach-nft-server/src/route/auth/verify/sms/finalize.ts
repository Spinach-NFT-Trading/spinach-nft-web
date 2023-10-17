import {apiPath} from '@spinach/common/const/path';
import {
  SmsVerifyFinalizeRequest,
  SmsVerifyFinalizeRequestSchema,
  SmsVerifyFinalizeResponse,
  SmsVerifyFinalizeResponseSchema,
} from '@spinach/common/types/api/auth/verify/sms/finalize';
import {isApiError} from '@spinach/common/types/api/error';

import {Server} from '@spinach/server/const';
import {recordSmsVerifyFinalized} from '@spinach/server/controller/auth/verify/sms/finalize';


export const addSmsVerifyFinalize = () => {
  Server.post<{Body: SmsVerifyFinalizeRequest, Reply: SmsVerifyFinalizeResponse}>(
    apiPath.auth.sms.finalize,
    {
      schema: {
        body: SmsVerifyFinalizeRequestSchema,
        response: {
          200: SmsVerifyFinalizeResponseSchema,
        },
      },
    },
    async ({body}): Promise<SmsVerifyFinalizeResponse> => {
      const data = await recordSmsVerifyFinalized(body);

      if (isApiError(data)) {
        return {
          success: false,
          error: data,
        };
      }

      return {success: true, data};
    },
  );
};
