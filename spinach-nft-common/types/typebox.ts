import {Static, TBoolean, Type} from '@sinclair/typebox';


export interface TBoolTrue extends TBoolean {
  static: true;
}

export const BoolTrueSchema = Type.Unsafe<Static<TBoolTrue>>(Type.Boolean());

export interface TBoolFalse extends TBoolean {
  static: false;
}

export const BoolFalseSchema = Type.Unsafe<Static<TBoolFalse>>(Type.Boolean());
