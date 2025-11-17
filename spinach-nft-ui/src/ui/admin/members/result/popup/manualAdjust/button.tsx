import React from 'react';


type Props = {
  onClick: () => void,
  disabled: boolean,
};

export const AdminMemberManualAdjustButton = ({onClick, disabled, children}: React.PropsWithChildren<Props>) => {
  return (
    <button
      type="button"
      className="button-clickable-bg flex items-center gap-0.5 rounded-lg px-2 py-1"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
