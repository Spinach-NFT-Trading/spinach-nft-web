export type ElementFocusControl = {
  focused: boolean,
  domEventHandlers: {
    onBlur: () => void,
    onFocus: () => void,
  },
};

export type UseFocusedOpts = {
  onBlurred?: () => void,
};
