export type SendSmsPayload = {
  username: string,
  password: string,
  smsMessage: string,
  phone: string[],
} & ({
  method: 'instant',
  sendDate?: never,
  hour?: never,
  min?: never,
} | {
  method: 'scheduled',
  sendDate: `${number}/${number}/${number}`,
  hour: number,
  min: number,
});

export type SendSmsMethod = SendSmsPayload['method'];

export type SendSmsResponse = {
  stats: boolean,
};
