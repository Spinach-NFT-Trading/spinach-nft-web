import {TSchema, Type} from '@sinclair/typebox';

import {ApiErrorResponseSchema} from '@spinach/common/types/api/error';
import {BoolTrueSchema} from '@spinach/common/types/typebox';


export const generateApiFailableSchema = <T extends TSchema>(dataSchema: T) => {
  return Type.Union([
    Type.Object(
      {
        success: BoolTrueSchema,
        data: dataSchema,
      },
      {additionalProperties: false},
    ),
    ApiErrorResponseSchema,
  ]);
};
