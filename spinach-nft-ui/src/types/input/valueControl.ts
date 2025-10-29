import {Nullable} from '@spinach/common/types/common/typing';


export type InputValueControlValueRequiredProps<TValue> = {
  value: TValue,
  setValue: (newValue: TValue) => void,
};

export type InputValueControlValueOptionalProps<TValue> = {
  value: Nullable<TValue>,
  setValue: (newValue: Nullable<TValue>) => void,
};

export type InputValueControlCommonProps<TValue> =
  ({type: 'required'} & InputValueControlValueRequiredProps<TValue>) |
  ({type: 'optional'} & InputValueControlValueOptionalProps<TValue>);
