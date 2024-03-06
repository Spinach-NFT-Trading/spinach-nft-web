import {getUserById} from '@spinach/next/controller/user/info';


export const isAdmin = async (userId: string | undefined): Promise<boolean> => {
  return !!(await getUserById(userId))?.isAdmin;
};

export const throwIfNotAdmin = async (userId: string | undefined) => {
  if (!await isAdmin(userId)) {
    throw new Error(`User ID ${userId} does not have admin privilege!`);
  }
};

export const isAdminOrAgent = async (userId: string | undefined) => {
  const user = await getUserById(userId);

  return {
    user,
    result: !!user?.isAdmin || !!user?.isAgent,
  };
};

export const throwIfNotAdminOrAgent = async (userId: string | undefined) => {
  const {user, result} = await isAdminOrAgent(userId);

  if (!user || !result) {
    throw new Error(`User ID ${userId} does not have admin privilege or is not an agent!`);
  }

  return user;
};

export const isSuspended = async (userId: string | undefined): Promise<boolean> => {
  const user = await getUserById(userId);

  return !!user && user.isSuspended;
};
