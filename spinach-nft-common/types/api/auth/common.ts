import {Type} from '@sinclair/typebox';

import {passwordPattern, userIdPattern, usernamePattern} from '@spinach/common/const/auth';
import {idNumberPattern} from '@spinach/common/const/id';


export const UserIdSchemaBase = Type.String({pattern: userIdPattern});

export const UsernameSchemaBase = Type.String({pattern: usernamePattern});

export const PasswordSchemaBase = Type.String({pattern: passwordPattern});

export const IdNumberSchemaBase = Type.String({pattern: idNumberPattern});
