import {Static, Type} from '@sinclair/typebox';

import {lineIdPattern, namePattern} from '@spinach/common/const/auth';
import {IdNumberSchemaBase, UsernameSchemaBase} from '@spinach/common/types/api/auth/common';
import {IsoDateStringSchema} from '@spinach/common/types/common/date';
import {WalletSchemaBase} from '@spinach/common/types/common/wallet';
import {BankDetailsSchema} from '@spinach/common/types/data/user/bank';


export const UserPropertySchemaBase = {
  verified: Type.Boolean(),
  admin: Type.Boolean(),
};

export const UserInfoSchemaBase = {
  username: UsernameSchemaBase,
  idNumber: IdNumberSchemaBase,
  name: Type.String({pattern: namePattern}),
  email: Type.String({format: 'email'}),
  birthday: IsoDateStringSchema,
  lineId: Type.String({pattern: lineIdPattern}),
  wallet: WalletSchemaBase,
};

export const UserInfoSchema = Type.Object(
  {
    id: Type.String(),
    ...UserInfoSchemaBase,
    ...UserPropertySchemaBase,
    bankDetails: Type.Array(BankDetailsSchema, {uniqueItems: true}),
  },
  {additionalProperties: false},
);

export type UserInfo = Static<typeof UserInfoSchema>;
