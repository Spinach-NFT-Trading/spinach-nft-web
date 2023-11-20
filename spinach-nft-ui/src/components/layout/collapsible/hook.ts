import React from 'react';


export const useCollapsible = (defaultShow: boolean = false) => {
  const [show, setShow] = React.useState(defaultShow);

  return {show, setShow};
};
