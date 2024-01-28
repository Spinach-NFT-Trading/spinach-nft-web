import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {UserInfo, UserInfoListByAgent} from '@spinach/common/types/common/user';
import {UserModel} from '@spinach/common/types/data/user/data';
import {Document, Filter, WithId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {toUserInfo} from '@spinach/next/controller/user/utils';
import {throwIfNotAdminOrAgent} from '@spinach/next/controller/utils';


export type GetUserInfoListOpts = ControllerRequireUserIdOpts & {
  agentId: string | null,
};

export const getUserInfoList = async ({executorUserId, agentId}: GetUserInfoListOpts): Promise<UserInfo[]> => {
  const user = await throwIfNotAdminOrAgent(executorUserId);

  if (user.isAdmin) {
    return userInfoCollection.find({recruitedBy: agentId}).map(toUserInfo).toArray();
  }

  if (user.isAgent) {
    return userInfoCollection.find({recruitedBy: executorUserId}).map(toUserInfo).toArray();
  }

  throw new Error(`Unhandled user info list fetching for user ${user._id.toHexString()}`);
};

type AggregatedAccountMemberList = {
  _id: string,
  members: WithId<UserModel>[],
};

export type GetAccountMemberListByAgentOpts = ControllerRequireUserIdOpts;

export const getAccountMemberListByAgent = async ({
  executorUserId,
}: GetAccountMemberListByAgentOpts): Promise<UserInfoListByAgent[]> => {
  const user = await throwIfNotAdminOrAgent(executorUserId);

  const pipeline: Document[] = [];
  if (user.isAgent) {
    pipeline.push({
      $match: {recruitedBy: executorUserId} satisfies Filter<UserModel>,
    });
  }

  const aggregated = await userInfoCollection.aggregate<AggregatedAccountMemberList>([
    ...pipeline,
    {
      $group: {
        _id: '$recruitedBy',
        members: {
          $push: '$$ROOT',
        },
      },
    },
  ]).toArray();

  return aggregated.map<UserInfoListByAgent>(({_id, members}) => ({
    agentId: _id,
    members: members.map(toUserInfo),
  }));
};
