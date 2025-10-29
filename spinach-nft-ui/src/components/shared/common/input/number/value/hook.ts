import {Nullable} from '@spinach/common/types/common/typing';

import {
  NumberInputValueType,
} from '@spinach/next/components/shared/common/input/number/type';
import {getNumberInputFormattedValue} from '@spinach/next/components/shared/common/input/number/value/utils';
import {ElementFocusControl} from '@spinach/next/hooks/element/focus/type';


type UseNumberInputValueOpts = {
  valueType?: NumberInputValueType,
  valueInternal: Nullable<number>,
  focusControl: ElementFocusControl,
};

export const useNumberInputValue = ({valueType, valueInternal, focusControl}: UseNumberInputValueOpts) => {
  const {focused} = focusControl;

  return {
    valueForDisplay: getNumberInputFormattedValue({value: valueInternal, valueType, focused}),
  };
};
