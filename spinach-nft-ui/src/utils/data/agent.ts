export const generateAgentReferralLink = (agentUserId: string) => {
  return `${process.env.NEXT_PUBLIC_HOST}/account/register?agent=${agentUserId}`;
};
