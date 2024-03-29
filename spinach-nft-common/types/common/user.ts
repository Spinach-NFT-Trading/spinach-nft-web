import {Static, Type} from '@sinclair/typebox';

import {lineIdPattern, namePattern, phonePattern} from '@spinach/common/const/auth';
import {IdNumberSchemaBase, UserIdSchemaBase, UsernameSchemaBase} from '@spinach/common/types/api/auth/common';
import {IsoDateStringSchema} from '@spinach/common/types/common/date';
import {VerificationStatusSchema} from '@spinach/common/types/common/status';
import {WalletSchemaBase} from '@spinach/common/types/common/wallet';


export const UserPropertySchemaBase = {
  status: VerificationStatusSchema,
  isAdmin: Type.Boolean(),
  isMod: Type.Boolean(),
  isAgent: Type.Boolean(),
  isSuspended: Type.Boolean(),
  commissionRate: Type.Number({minimum: 0, maximum: 1}),
};

export const UserDataSchemaBase = {
  username: UsernameSchemaBase,
  idNumber: IdNumberSchemaBase,
  name: Type.String({pattern: namePattern}),
  email: Type.String({format: 'email'}),
  birthday: IsoDateStringSchema,
  lineId: Type.String({pattern: lineIdPattern}),
  wallet: WalletSchemaBase,
  phone: Type.String({pattern: phonePattern}),
  recruitedBy: Type.Union([UserIdSchemaBase, Type.Null()]),
};

export const UserDataSchema = Type.Object(
  UserDataSchemaBase,
  {additionalProperties: false},
);

export type UserData = Static<typeof UserDataSchema>;

export type UserDataMap = {[userId in string]?: UserData};

export const UserInfoSchema = Type.Object(
  {
    id: Type.String(),
    ...UserDataSchemaBase,
    ...UserPropertySchemaBase,
  },
  {additionalProperties: false},
);

export type UserInfo = Static<typeof UserInfoSchema>;

export type UserInfoListByAgent = {
  agentId: string | null,
  members: UserInfo[],
};
