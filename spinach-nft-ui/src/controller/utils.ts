import {userInfoCollection} from '@spinach/common/controller/collections/user';
import {ObjectId} from 'mongodb';


export const isAdmin = async (userId: string | undefined): Promise<boolean> => {
  return (await userInfoCollection.countDocuments({_id: new ObjectId(userId), admin: true})) > 0;
};

export const throwIfNotAdmin = async (userId: string | undefined) => {
  if (!await isAdmin(userId)) {
    throw new Error(`User ID ${userId} does not have admin privilege!`);
  }
};
