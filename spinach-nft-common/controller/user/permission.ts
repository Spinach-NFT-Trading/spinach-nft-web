import {getUserById} from '@spinach/common/controller/user/info';


export const isAdmin = async (userId: string | undefined): Promise<boolean> => {
  const user = await getUserById(userId);
  if (!user) {
    return false;
  }

  return user.isAdmin;
};

export const throwIfNotAdmin = async (userId: string | undefined) => {
  if (!await isAdmin(userId)) {
    throw new Error(`User ID ${userId} is not an admin!`);
  }
};

const isPrivileged = async (userId: string | undefined): Promise<boolean> => {
  const user = await getUserById(userId);
  if (!user) {
    return false;
  }

  return user.isAdmin || user.isMod;
};

export const throwIfNotPrivileged = async (userId: string | undefined) => {
  if (!await isPrivileged(userId)) {
    throw new Error(`User ID ${userId} is not privileged!`);
  }
};

const isElevated = async (userId: string | undefined) => {
  const user = await getUserById(userId);

  return {
    user,
    result: !!user?.isAdmin || !!user?.isMod || !!user?.isAgent,
  };
};

export const throwIfNotElevated = async (userId: string | undefined) => {
  const {user, result} = await isElevated(userId);

  if (!user || !result) {
    throw new Error(`User ID ${userId} is not elevated!`);
  }

  return user;
};

export const isSuspended = async (userId: string | undefined): Promise<boolean> => {
  const user = await getUserById(userId);

  return !!user && user.isSuspended;
};
