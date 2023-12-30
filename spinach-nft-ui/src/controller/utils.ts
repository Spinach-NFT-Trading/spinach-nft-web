import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {ObjectId} from 'mongodb';


const getUser = (userId: string | undefined) => {
  return userInfoCollection.findOne({_id: new ObjectId(userId)});
};

export const isAdmin = async (userId: string | undefined): Promise<boolean> => {
  return !!(await getUser(userId))?.admin;
};

export const throwIfNotAdmin = async (userId: string | undefined) => {
  if (!await isAdmin(userId)) {
    throw new Error(`User ID ${userId} does not have admin privilege!`);
  }
};

export const isAdminOrAgent = async (userId: string | undefined): Promise<boolean> => {
  const user = await getUser(userId);

  return !!user?.admin || !!user?.agent;
};

export const throwIfNotAdminOrAgent = async (userId: string | undefined) => {
  if (!await isAdminOrAgent(userId)) {
    throw new Error(`User ID ${userId} does not have admin privilege or is not an agent!`);
  }
};
