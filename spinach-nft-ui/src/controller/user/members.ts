import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {UserInfo, UserInfoListByAgent} from '@spinach/common/types/common/user/info';
import {UserModel} from '@spinach/common/types/data/user/data';
import {isNotNullish} from '@spinach/common/utils/type';
import {Document, Filter, ObjectId, WithId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';
import {toUserInfo} from '@spinach/next/controller/user/utils';
import {throwIfNotElevated} from '@spinach/next/controller/utils';


export type GetUserInfoByIdOpts = ControllerRequireUserIdOpts & {
  userId: string | null,
};

export const getUserInfoById = async ({executorUserId, userId}: GetUserInfoByIdOpts): Promise<UserInfo | null> => {
  await throwIfNotElevated(executorUserId);

  if (!userId) {
    return null;
  }

  const userModel = await userInfoCollection.findOne({_id: new ObjectId(userId)});
  if (!userModel) {
    return null;
  }

  return toUserInfo(userModel);
};

export type GetUserInfoListOpts = ControllerRequireUserIdOpts & {
  agentId: string | null,
};

export const getUserInfoList = async ({executorUserId, agentId}: GetUserInfoListOpts): Promise<UserInfo[]> => {
  const user = await throwIfNotElevated(executorUserId);

  if (user.isAdmin) {
    return userInfoCollection.find({recruitedBy: agentId}).map(toUserInfo).toArray();
  }

  if (user.isMod) {
    return userInfoCollection.find({recruitedBy: agentId, isAdmin: false}).map(toUserInfo).toArray();
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
  const user = await throwIfNotElevated(executorUserId);

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

  const commissionPercentAgentByUserId = Object.fromEntries(
    (await userInfoCollection
      .find({_id: {$in: aggregated.map(({_id}) => new ObjectId(_id))}})
      .toArray())
      .map((data) => [data._id, data.commissionPercentAgent]),
  );

  return aggregated
    .map<UserInfoListByAgent | null>(({_id, members}) => {
      const commissionPercent = commissionPercentAgentByUserId[_id];
      if (!commissionPercent) {
        return null;
      }

      return {
        agentId: _id,
        commissionPercent,
        members: members.map(toUserInfo),
      };
    })
    .filter(isNotNullish);
};
