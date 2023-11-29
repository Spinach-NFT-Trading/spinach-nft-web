import {Static} from '@sinclair/typebox';

import {UserBankDetailsSchema} from '@spinach/common/types/data/user/bank';


export const UserAddBankDetailsRequestSchema = UserBankDetailsSchema;

export type UserAddBankDetailsRequest = Static<typeof UserAddBankDetailsRequestSchema>;
