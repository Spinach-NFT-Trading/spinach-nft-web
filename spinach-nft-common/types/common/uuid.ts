import {Type} from '@sinclair/typebox';

import {uuidPattern} from '@spinach/common/const/common';


export const UuidSchemaBase = Type.String({pattern: uuidPattern});
