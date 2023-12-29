import {Static, Type} from '@sinclair/typebox';

import {lineIdPattern, namePattern} from '@spinach/common/const/auth';
import {IdNumberSchemaBase, UserIdSchemaBase, UsernameSchemaBase} from '@spinach/common/types/api/auth/common';
import {IsoDateStringSchema} from '@spinach/common/types/common/date';
import {VerificationStatusSchema} from '@spinach/common/types/common/status';
import {WalletSchemaBase} from '@spinach/common/types/common/wallet';
import {BankDetailsSchema} from '@spinach/common/types/data/user/bank';


export const UserPropertySchemaBase = {
  status: VerificationStatusSchema,
  admin: Type.Boolean(),
  agent: Type.Boolean(),
  recruitedBy: Type.Union([UserIdSchemaBase, Type.Null()]),
};

export const UserDataSchemaBase = {
  username: UsernameSchemaBase,
  idNumber: IdNumberSchemaBase,
  name: Type.String({pattern: namePattern}),
  email: Type.String({format: 'email'}),
  birthday: IsoDateStringSchema,
  lineId: Type.String({pattern: lineIdPattern}),
  wallet: WalletSchemaBase,
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
    bankDetails: Type.Array(BankDetailsSchema, {uniqueItems: true}),
  },
  {additionalProperties: false},
);

export type UserInfo = Static<typeof UserInfoSchema>;
