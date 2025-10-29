import {InputValueControlCommonProps} from '@spinach/next/types/input/valueControl';


export const numberInputValueType = [
  'integer',
  'float', // Limits decimals to 2 optionally
  'original',
] as const;

export type NumberInputValueType = typeof numberInputValueType[number];

export type NumberInputValueCommonProps = InputValueControlCommonProps<number> & {
  valueType?: NumberInputValueType,
};

// "Neutral" as in the props are not affected by the value typing
export type NumberInputLayoutNeutralProps = {
  min?: number,
  max?: number,
  classOfInputWidth?: string,
  disabled?: boolean,
};

export type NumberInputLayoutProps = NumberInputLayoutNeutralProps & NumberInputValueCommonProps;
