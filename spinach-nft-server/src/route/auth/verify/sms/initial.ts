import {apiPath} from '@spinach/common/const/path';
import {
  SmsVerifyInitialRequest,
  SmsVerifyInitialRequestSchema,
  SmsVerifyInitialResponse,
  SmsVerifyInitialResponseSchema,
} from '@spinach/common/types/api/auth/verify/sms/initial';
import {isApiError} from '@spinach/common/types/api/error';
import {isProduction} from '@spinach/common/utils/env';

import {Server} from '@spinach/server/const';
import {recordSmsVerifyInitialize} from '@spinach/server/controller/auth/verify/sms/initial';
import {generateOtp} from '@spinach/server/utils/otp';
import {toSmsOtpPayload} from '@spinach/server/utils/sms/payload';
import {sendSms} from '@spinach/server/utils/sms/send';


export const addSmsVerifyInitial = () => {
  Server.post<{Body: SmsVerifyInitialRequest, Reply: SmsVerifyInitialResponse}>(
    apiPath.auth.sms.initial,
    {
      schema: {
        body: SmsVerifyInitialRequestSchema,
        response: {
          200: SmsVerifyInitialResponseSchema,
        },
      },
    },
    async ({body}): Promise<SmsVerifyInitialResponse> => {
      const otp = generateOtp(6);
      const {phone} = body;

      // Only actually sends SMS in production
      if (isProduction()) {
        const {stats} = await sendSms({
          data: toSmsOtpPayload({phone, otp}),
        });
        if (!stats) {
          return {
            success: false,
            error: 'smsSendFailed',
          };
        }
      }

      const data = await recordSmsVerifyInitialize({
        phone: body.phone,
        otp,
      });

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
