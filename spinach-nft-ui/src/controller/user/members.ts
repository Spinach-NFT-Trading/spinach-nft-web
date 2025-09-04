import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {throwIfNotElevated} from '@spinach/common/controller/user/permission';
import {UserInfo, UserInfoListByAgent} from '@spinach/common/types/common/user/info';
import {UserModel} from '@spinach/common/types/data/user/data';
import {toUserInfo} from '@spinach/common/utils/data/user';
import {toObject} from '@spinach/common/utils/object/make';
import {isNotNullish} from '@spinach/common/utils/type';
import {Document, Filter, ObjectId, WithId} from 'mongodb';

import {ControllerRequireUserIdOpts} from '@spinach/next/controller/user/type';


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
  _id: string | null,
  members: WithId<UserModel>[],
};

export type GetAccountMemberListByAgentOpts = ControllerRequireUserIdOpts;

export const getAccountMemberListByAgent = async ({
  executorUserId,
}: GetAccountMemberListByAgentOpts): Promise<UserInfoListByAgent[]> => {
  const user = await throwIfNotElevated(executorUserId);

  const pipeline: Document[] = [];
  let filterForAgentsToReturn: Filter<UserModel> = {isAgent: true};
  if (user.isAgent) {
    filterForAgentsToReturn = {
      ...filterForAgentsToReturn,
      recruitedBy: executorUserId,
    };
  }

  const [
    aggregated,
    agentsToReturn,
  ] = await Promise.all([
    userInfoCollection.aggregate<AggregatedAccountMemberList>([
      ...pipeline,
      {
        $group: {
          _id: '$recruitedBy',
          members: {
            $push: '$$ROOT',
          },
        },
      },
    ]).toArray(),
    userInfoCollection.find(filterForAgentsToReturn).toArray(),
  ]);

  const commissionPercentAgentByUserId = toObject(
    await userInfoCollection
      .find({
        _id: {
          $in: aggregated
            .map(({_id}) => _id != null ? new ObjectId(_id) : null)
            .filter(isNotNullish),
        },
      })
      .toArray(),
    (data) => [data._id.toString(), data.commissionPercentAgent],
  );

  const membersByAgentId = new Map(
    aggregated
      .map(({_id, members}): [string | null, UserInfo[]] | null => {
        if (_id == null) {
          return [null, members.map(toUserInfo)];
        }

        const commissionPercent = commissionPercentAgentByUserId[_id];
        if (!commissionPercent) {
          return null;
        }

        return [_id, members.map(toUserInfo)];
      })
      .filter(isNotNullish),
  );

  return [...agentsToReturn, null].map((agent): UserInfoListByAgent => {
    if (agent == null) {
      return {
        agentId: null,
        commissionPercent: null,
        members: membersByAgentId.get(null) ?? [],
      };
    }

    const agentId = agent._id.toString();

    return {
      agentId,
      commissionPercent: agent.commissionPercentAgent,
      members: membersByAgentId.get(agentId) ?? [],
    };
  });
};
