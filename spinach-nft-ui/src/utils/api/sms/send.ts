import {sendSmsMethodToId} from '@spinach/next/const/sms';
import {SendSmsPayload, SendSmsResponse} from '@spinach/next/types/api/sms';


// https://www.sms-get.com/api_desc.pdf
const toSmsPayloadBody = ({username, password, smsMessage, phone, method}: SendSmsPayload): string => {
  const params = new URLSearchParams();
  params.set('username', username);
  params.set('password', password);
  params.set('sms_msg', smsMessage);
  params.set('phone', phone.join(','));
  params.set('method', sendSmsMethodToId[method].toString());

  return params.toString();
};

type SendSmsOpts = {
  data: SendSmsPayload,
};

export const sendSms = async ({data}: SendSmsOpts): Promise<SendSmsResponse> => {
  const response = await fetch(
    `https://sms-get.com/api_send.php`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: encodeURIComponent(toSmsPayloadBody(data)),
    },
  );

  return response.json();
};
