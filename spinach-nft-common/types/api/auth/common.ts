import {Type} from '@sinclair/typebox';


export const UsernameSchemaBase = Type.String({pattern: '[a-zA-Z0-9]{6,}'});

export const PasswordSchemaBase = Type.String({pattern: '[a-zA-Z0-9]{6,}'});
