import React from 'react';

import {toast} from 'react-hot-toast';

import {Toast} from '@spinach/next/components/toast';


type ShowToastOpts = {
  isAlert?: boolean,
  content: React.ReactNode,
};

export const showToast = ({isAlert, content}: ShowToastOpts) => {
  toast.custom(({visible}) => <Toast visible={visible} isAlert={isAlert}>{content}</Toast>);
};
