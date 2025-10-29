import React from 'react';

import {ElementFocusControl, UseFocusedOpts} from '@spinach/next/hooks/element/focus/type';


export const useFocused = (opts?: UseFocusedOpts): ElementFocusControl => {
  const [focused, setFocused] = React.useState(false);

  return {
    focused,
    domEventHandlers: {
      onBlur: () => {
        setFocused(false);
        if (opts?.onBlurred) {
          opts.onBlurred();
        }
      },
      onFocus: () => setFocused(true),
    },
  };
};
