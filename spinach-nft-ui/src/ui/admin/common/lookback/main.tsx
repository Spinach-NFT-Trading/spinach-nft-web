import React from 'react';

import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import {getDateAfterDelta, toIsoLocalDateStringFromEpochMs} from '@spinach/common/utils/date';
import {endOfDay} from 'date-fns/endOfDay';
import {lastDayOfMonth} from 'date-fns/lastDayOfMonth';
import {parse} from 'date-fns/parse';
import {startOfDay} from 'date-fns/startOfDay';
import {startOfMonth} from 'date-fns/startOfMonth';
import {useTranslations} from 'next-intl';

import {FlexForm} from '@spinach/next/components/layout/flex/form';
import {InputBox} from '@spinach/next/components/shared/common/input/box';
import {DataLookBackRequest} from '@spinach/next/types/userData/load';
import {AdminLookBackInputControl, AdminLookBackInputState} from '@spinach/next/ui/admin/common/lookback/type';
import {generateDataLookBackRequestOfSameDay} from '@spinach/next/ui/admin/common/lookback/utils';
import {adminLookBackButtonStyle} from '@spinach/next/ui/admin/members/result/popup/common/const';


type Props = {
  inputControl: AdminLookBackInputControl,
};

export const AdminMemberDataLookBackInput = ({inputControl}: Props) => {
  const {
    now,
    state,
    setState,
    setInputAndSend,
  } = inputControl;

  const t = useTranslations('UI.InPage.Admin.Common.LookBack');

  return (
    <FlexForm direction="row" className="items-center gap-1.5">
      <InputBox
        id="start"
        placeholder={t('StartDate')}
        type="date"
        value={toIsoLocalDateStringFromEpochMs(state.control.startEpochMs)}
        onChange={({target}) => setState(({control, ...original}) => ({
          ...original,
          control: {
            ...control,
            startEpochMs: startOfDay(parse(target.value, 'yyyy-MM-dd', new Date())).getTime(),
          },
        } satisfies AdminLookBackInputState))}
        className="text-center"
        required
      />
      <span>~</span>
      <InputBox
        id="end"
        placeholder={t('EndDate')}
        type="date"
        value={toIsoLocalDateStringFromEpochMs(state.control.endEpochMs)}
        onChange={({target}) => setState(({control, ...original}) => ({
          ...original,
          control: {
            ...control,
            endEpochMs: endOfDay(parse(target.value, 'yyyy-MM-dd', new Date())).getTime(),
          },
        } satisfies AdminLookBackInputState))}
        className="text-center"
        required
      />
      <button type="submit" className={adminLookBackButtonStyle} onClick={() => setState(({sent, ...original}) => ({
        ...original,
        sent: original.control,
        timestamp: Date.now(),
      } satisfies AdminLookBackInputState))}>
        <MagnifyingGlassIcon className="size-5"/>
      </button>
      <button type="button" className={adminLookBackButtonStyle} onClick={() => setInputAndSend((original) => ({
        ...original,
        ...generateDataLookBackRequestOfSameDay(),
      } satisfies DataLookBackRequest))}>
        {t('Today')}
      </button>
      <button type="button" className={adminLookBackButtonStyle} onClick={() => setInputAndSend((original) => ({
        ...original,
        startEpochMs: startOfDay(getDateAfterDelta({date: now, delta: {day: -1}})).getTime(),
        endEpochMs: endOfDay(getDateAfterDelta({date: now, delta: {day: -1}})).getTime(),
      } satisfies DataLookBackRequest))}>
        {t('Yesterday')}
      </button>
      <button type="button" className={adminLookBackButtonStyle} onClick={() => setInputAndSend((original) => ({
        ...original,
        startEpochMs: startOfDay(getDateAfterDelta({date: now, delta: {day: -7}})).getTime(),
        endEpochMs: endOfDay(now).getTime(),
      } satisfies DataLookBackRequest))}>
        {t('ThisWeek')}
      </button>
      <button type="button" className={adminLookBackButtonStyle} onClick={() => setInputAndSend((original) => ({
        ...original,
        startEpochMs: startOfMonth(now).getTime(),
        endEpochMs: endOfDay(now).getTime(),
      } satisfies DataLookBackRequest))}>
        {t('ThisMonth')}
      </button>
      <button type="button" className={adminLookBackButtonStyle} onClick={() => setInputAndSend((original) => ({
        ...original,
        // `setDate(0)` for changing date to last day or previous month
        // https://github.com/date-fns/date-fns/discussions/2945
        startEpochMs: startOfMonth(new Date(new Date(now).setDate(0))).getTime(),
        endEpochMs: lastDayOfMonth(new Date(new Date(now).setDate(0))).getTime(),
      } satisfies DataLookBackRequest))}>
        {t('LastMonth')}
      </button>
    </FlexForm>
  );
};
