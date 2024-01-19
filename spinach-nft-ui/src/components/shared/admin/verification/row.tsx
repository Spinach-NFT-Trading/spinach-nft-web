import React from 'react';

import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon';

import {FlexButton} from '@spinach/next/components/layout/flex/button';
import {AdminVerificationPopupControl} from '@spinach/next/components/shared/admin/verification/popup/type';
import {AdminVerificationRowProps} from '@spinach/next/components/shared/admin/verification/type';


type Props<TData> = AdminVerificationPopupControl<TData> & AdminVerificationRowProps<TData>;

export const AdminVerificationRow = <TData, >({
  setState,
  data,
  getInfo,
  getImageRequestPayload,
  getPopupData,
}: Props<TData>) => {
  const payload = getPopupData(data);

  if (!payload) {
    return null;
  }

  return (
    <>
      {getInfo(data)}
      <FlexButton
        className="button-clickable-bg items-center gap-1 p-1"
        onClick={() => setState((original) => ({
          ...original,
          show: true,
          type: 'other',
          payload,
        }))}
      >
        <InformationCircleIcon className="h-6 w-6"/>
        <span>其他資訊</span>
      </FlexButton>
      {getImageRequestPayload(data).map((payload) => (
        <button
          key={payload.imageName}
          className="button-clickable-bg p-1"
          onClick={() => setState((original) => ({
            ...original,
            show: true,
            type: 'image',
            payload,
          }))}
        >
          {payload.imageName}
        </button>
      ))}
      <button className="button-clickable-bg-warn p-1" onClick={() => setState((original) => ({
        ...original,
        show: true,
        type: 'confirm',
        payload,
      }))}>
        確認驗證
      </button>
    </>
  );
};
