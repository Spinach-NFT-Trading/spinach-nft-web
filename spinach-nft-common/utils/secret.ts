import {compare, hash} from 'bcryptjs';


export const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, 12);
};

export const verifyPasswordOrThrow = async (password: string, passwordHash: string): Promise<void> => {
  const success = await compare(password, passwordHash);

  if (!success) {
    throw new Error('invalid password');
  }
};
