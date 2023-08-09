import {Static} from '@sinclair/typebox';

import {BankDetailsSchema} from '@/types/common/user';


export const UserAddBankDetailsRequestSchema = BankDetailsSchema;

export type UserAddBankDetailsRequest = Static<typeof UserAddBankDetailsRequestSchema>;
