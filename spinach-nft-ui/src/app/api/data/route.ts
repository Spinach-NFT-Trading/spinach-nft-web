import {smsVerifyInitialCollection} from '@spinach/common/controller/collections/verify/sms';


export const dynamic = 'force-dynamic';

export const GET = async () => {
  const data = await smsVerifyInitialCollection.find().toArray();

  return Response.json(data, {status: 200});
};
