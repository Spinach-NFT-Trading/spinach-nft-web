import {Type} from '@sinclair/typebox';

import {passwordPattern, usernamePattern} from '@spinach/common/const/auth';


export const UsernameSchemaBase = Type.String({pattern: usernamePattern});

export const PasswordSchemaBase = Type.String({pattern: passwordPattern});
