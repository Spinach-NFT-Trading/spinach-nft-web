import React from 'react';

import clsx from 'clsx';

import {InputBox} from '@spinach/next/components/shared/common/input/box';
import {NumberInputLayoutProps} from '@spinach/next/components/shared/common/input/number/type';
import {
  getHtmlNumberInputMode,
  getNumberInputParsedValue,
} from '@spinach/next/components/shared/common/input/number/utils';
import {useNumberInputValue} from '@spinach/next/components/shared/common/input/number/value/hook';
import {useFocused} from '@spinach/next/hooks/element/focus/main';


export const NumberInput = (props: NumberInputLayoutProps) => {
  const {
    type,
    value,
    valueType,
    setValue,
    min,
    max,
    disabled,
    classOfInputWidth,
  } = props;

  const [valueInternal, setValueInternal] = React.useState(value);

  const onChangeCompleted = () => {
    const effectiveValue = valueInternal;

    if (effectiveValue == null) {
      if (type === 'optional') {
        setValue(null);
      }
      return;
    }

    setValue(effectiveValue);
  };

  const focusControl = useFocused({onBlurred: onChangeCompleted});
  const {valueForDisplay} = useNumberInputValue({
    ...props,
    valueInternal,
    focusControl,
  });

  // Keep internal value in sync with external value when not focused
  React.useEffect(() => {
    if (!focusControl.focused) {
      setValueInternal(value);
    }
  }, [value, focusControl.focused]);

  return (
    <InputBox
      value={valueForDisplay?.toString()}
      onChange={({target}) => {
        const parsedValue = getNumberInputParsedValue({
          valueString: target.value?.toString() ?? '',
          isRequired: type === 'required',
          min,
          max,
          ...props,
        });

        if (parsedValue == null) {
          if (type === 'optional') {
            setValueInternal(null);
          }
          return;
        }

        setValueInternal(parsedValue);
      }}
      className={clsx(
        'text-center',
        classOfInputWidth ?? 'w-20',
        value != null && min && value < min && 'text-red-400',
      )}
      min={min ?? 0}
      inputMode={getHtmlNumberInputMode(valueType)}
      disabled={disabled}
      {...focusControl.domEventHandlers}
    />
  );
};
