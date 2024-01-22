import React from 'react';

import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import {IsoDateString} from '@spinach/common/types/common/date';
import {getDateAfterDelta, toIsoUtcDateString} from '@spinach/common/utils/date';
import {lastDayOfMonth} from 'date-fns/lastDayOfMonth';
import {startOfMonth} from 'date-fns/startOfMonth';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {InputBox} from '@spinach/next/components/shared/common/input/box';
import {adminLookBackButtonStyle} from '@spinach/next/ui/admin/members/result/single/popup/common/const';
import {useAdminLookBackInput} from '@spinach/next/ui/admin/members/result/single/popup/common/input';
import {
  AdminLookBackPopupRequest,
  AdminLookBackLayoutRenderChildrenOpts, AdminLookBackRequestType,
} from '@spinach/next/ui/admin/members/result/single/popup/common/type';
import {AdminMemberPopupProps} from '@spinach/next/ui/admin/members/result/single/popup/type';


type Props = AdminMemberPopupProps & {
  requestType: AdminLookBackRequestType,
  header: React.ReactNode,
  children: (opts: AdminLookBackLayoutRenderChildrenOpts) => React.ReactNode,
};

export const AdminLookBackResultLayout = ({member, requestType, header, children}: Props) => {
  const {
    status,
    lazyLoaded,
    now,
    request,
    setRequest,
  } = useAdminLookBackInput({
    userId: member.id,
    requestType,
  });

  return (
    <Flex className="gap-2 pr-2">
      <Flex direction="row" className="items-center gap-2">
        <InputBox
          id="start"
          placeholder="日期 (起)"
          type="date"
          value={request.startDate}
          onChange={({target}) => setRequest((original) => ({
            ...original,
            startDate: target.value as IsoDateString,
          } satisfies AdminLookBackPopupRequest))}
          className="text-center"
          required
        />
        <span>~</span>
        <InputBox
          id="end"
          placeholder="日期 (訖)"
          type="date"
          value={request.endDate}
          onChange={({target}) => setRequest((original) => ({
            ...original,
            endDate: target.value as IsoDateString,
          } satisfies AdminLookBackPopupRequest))}
          className="text-center"
          required
        />
        <button className={adminLookBackButtonStyle} onClick={() => setRequest((original) => ({
          ...original,
          timestamp: Date.now(),
        } satisfies AdminLookBackPopupRequest))}>
          <MagnifyingGlassIcon className="h-6 w-6"/>
        </button>
        <button className={adminLookBackButtonStyle} onClick={() => setRequest((original) => ({
          ...original,
          startDate: toIsoUtcDateString(now),
          endDate: toIsoUtcDateString(now),
          timestamp: Date.now(),
        } satisfies AdminLookBackPopupRequest))}>
          今日
        </button>
        <button className={adminLookBackButtonStyle} onClick={() => setRequest((original) => ({
          ...original,
          startDate: toIsoUtcDateString(getDateAfterDelta({date: now, delta: {day: -1}})),
          endDate: toIsoUtcDateString(getDateAfterDelta({date: now, delta: {day: -1}})),
          timestamp: Date.now(),
        } satisfies AdminLookBackPopupRequest))}>
          昨日
        </button>
        <button className={adminLookBackButtonStyle} onClick={() => setRequest((original) => ({
          ...original,
          startDate: toIsoUtcDateString(getDateAfterDelta({date: now, delta: {day: -7}})),
          endDate: toIsoUtcDateString(now),
          timestamp: Date.now(),
        } satisfies AdminLookBackPopupRequest))}>
          7 日內
        </button>
        <button className={adminLookBackButtonStyle} onClick={() => setRequest((original) => ({
          ...original,
          startDate: toIsoUtcDateString(startOfMonth(now)),
          endDate: toIsoUtcDateString(now),
          timestamp: Date.now(),
        } satisfies AdminLookBackPopupRequest))}>
          本月
        </button>
        <button className={adminLookBackButtonStyle} onClick={() => setRequest((original) => ({
          ...original,
          // `setDate(0)` for changing date to last day or previous month
          // https://github.com/date-fns/date-fns/discussions/2945
          startDate: toIsoUtcDateString(startOfMonth(new Date(new Date(now).setDate(0)))),
          endDate: toIsoUtcDateString(lastDayOfMonth(new Date(new Date(now).setDate(0)))),
          timestamp: Date.now(),
        } satisfies AdminLookBackPopupRequest))}>
          上月
        </button>
      </Flex>
      {header}
      {children({lazyLoaded, status})}
    </Flex>
  );
};
