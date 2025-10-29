import React from 'react';

import {UseUserDataActorReturn} from '@spinach/next/hooks/userData/actor';
import {DataLookBackRequest} from '@spinach/next/types/userData/load';


export type AdminLookBackInputState = {
  control: DataLookBackRequest,
  sent: DataLookBackRequest,
  timestamp: number,
};

export type AdminLookBackInputControl = UseUserDataActorReturn & {
  now: Date,
  state: AdminLookBackInputState,
  setState: React.Dispatch<React.SetStateAction<AdminLookBackInputState>>,
  setInputAndSend: (getState: (original: DataLookBackRequest) => DataLookBackRequest) => void,
  refetch: () => void,
};
