import {TSchema, Type} from '@sinclair/typebox';

import {ApiErrorCodeSchema} from '@spinach/common/types/api/error';
import {BoolFalseSchema, BoolTrueSchema} from '@spinach/common/types/typebox';


export const generateApiFailableSchema = <T extends TSchema>(dataSchema: T) => {
  return Type.Union([
    Type.Object(
      {
        success: BoolTrueSchema,
        data: dataSchema,
      },
      {additionalProperties: false},
    ),
    Type.Object(
      {
        success: BoolFalseSchema,
        error: ApiErrorCodeSchema,
      },
      {additionalProperties: false},
    ),
  ]);
};
