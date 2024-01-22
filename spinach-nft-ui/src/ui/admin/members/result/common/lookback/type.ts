import React from 'react';

import {IsoDateString} from '@spinach/common/types/common/date';

import {UseUserDataActorReturn} from '@spinach/next/hooks/userData/actor';


export type AdminLookBackInput = {
  startDate: IsoDateString,
  endDate: IsoDateString,
};

export type AdminLookBackInputState = {
  control: AdminLookBackInput,
  sent: AdminLookBackInput,
  timestamp: number,
};

export type AdminLookBackInputControl = UseUserDataActorReturn & {
  now: Date,
  state: AdminLookBackInputState,
  setState: React.Dispatch<React.SetStateAction<AdminLookBackInputState>>,
  setInputAndSend: (getState: (original: AdminLookBackInput) => AdminLookBackInput) => void,
};
