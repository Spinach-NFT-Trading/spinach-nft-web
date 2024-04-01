import {Static, Type} from '@sinclair/typebox';

import {lineIdPattern, namePattern, phonePattern} from '@spinach/common/const/auth';
import {IdNumberSchemaBase, UserIdSchemaBase, UsernameSchemaBase} from '@spinach/common/types/api/auth/common';
import {IsoDateStringSchema} from '@spinach/common/types/common/date';
import {WalletSchemaBase} from '@spinach/common/types/common/wallet';


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
