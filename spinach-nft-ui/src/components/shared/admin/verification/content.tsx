import React from 'react';

import {translateApiError} from '@spinach/common/utils/translate/apiError';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Popup} from '@spinach/next/components/popup';
import {
  AdminVerificationConfirm,
} from '@spinach/next/components/shared/admin/verification/popup/confirm/main';
import {AdminVerificationImage} from '@spinach/next/components/shared/admin/verification/popup/image/main';
import {
  AdminVerificationCollapsibleProps,
  AdminVerificationCollapsibleState,
} from '@spinach/next/components/shared/admin/verification/type';
import {Alert} from '@spinach/next/components/shared/common/alert';
import {HorizontalSplitter} from '@spinach/next/components/shared/common/splitter';


export const AdminVerificationCollapsibleContent = <TData, >(props: AdminVerificationCollapsibleProps<TData>) => {
  const {data, getInfo, getImageRequestPayload, getImageData} = props;
  const [
    state,
    setState,
  ] = React.useState<AdminVerificationCollapsibleState>({
    show: null,
    payload: null,
    error: null,
  });

  return (
    <Flex>
      <Popup show={state.show === 'image'} setShow={() => setState((original) => ({
        ...original,
        show: null,
      }))}>
        <AdminVerificationImage state={state} getImageData={getImageData}/>
      </Popup>
      <AdminVerificationConfirm state={state} setState={setState} {...props}/>
      <Flex className="gap-1.5 p-2">
        {state.error && <Alert>{translateApiError(state.error)}</Alert>}
        {getInfo(data)}
        {getImageRequestPayload(data).map((payload) => (
          <button
            key={payload.imageName}
            className="button-clickable-bg py-3"
            onClick={() => setState((original) => ({
              ...original,
              payload,
              show: 'image',
            }))}
          >
            {payload.imageName}
          </button>
        ))}
        <HorizontalSplitter/>
        <button className="button-clickable-bg-warn py-5" onClick={() => setState((original) => ({
          ...original,
          show: 'confirm',
          payload: null,
        }))}>
          確認驗證
        </button>
      </Flex>
    </Flex>
  );
};
