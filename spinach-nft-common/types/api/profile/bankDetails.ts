import {Static} from '@sinclair/typebox';

import {BankDetailsSchema} from '@spinach/common/types/common/user';


export const UserAddBankDetailsRequestSchema = BankDetailsSchema;

export type UserAddBankDetailsRequest = Static<typeof UserAddBankDetailsRequestSchema>;
