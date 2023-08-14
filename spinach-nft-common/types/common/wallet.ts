import {Type} from '@sinclair/typebox';

import {walletPattern} from '@spinach/common/const/auth';


export const WalletSchemaBase = Type.String({pattern: walletPattern});
