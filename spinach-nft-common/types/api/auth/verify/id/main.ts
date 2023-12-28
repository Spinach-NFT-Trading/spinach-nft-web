import {Static, Type} from '@sinclair/typebox';

import {AccountIdVerificationTypeSchema} from '@spinach/common/types/api/profile/id';
import {BinaryDataSchema} from '@spinach/common/types/common/binary';


export const UserIdVerificationDataSchema = Type.Record(
  AccountIdVerificationTypeSchema,
  Type.Union([BinaryDataSchema, Type.Null()]),
);

export type UserIdVerificationData = Static<typeof UserIdVerificationDataSchema>;
