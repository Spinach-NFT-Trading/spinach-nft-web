'use client';
import React from 'react';

import {clsx} from 'clsx';

import {announcementTextClasses} from '@spinach/next/components/announcement/styles';
import {AnnouncementProps} from '@spinach/next/components/announcement/type';
import {HorizontalSplitter} from '@spinach/next/components/shared/common/splitter';
import {Announcement} from '@spinach/next/types/mongo/announcement';

import styles from './main.module.css';


type Props = AnnouncementProps & {
  announcements: Announcement[],
};

export const AnnouncementsClient = ({larger, announcements}: Props) => {
  const [idx, setIdx] = React.useState(0);

  // Could be `undefined` if `idx` goes out of bound
  // - This could happen if the user switch to the other language with less site alerts
  const announcement = announcements[idx] as Announcement | undefined;

  if (!announcement) {
    setIdx(0);
    return <></>;
  }

  const {message, level} = announcement;
  const commonClass = larger ? styles['announcement-lg'] : styles['announcement'];

  return (
    <>
      <div className={clsx(styles['announcement-animation'], commonClass)}>
        <div
          className={clsx(announcementTextClasses[level], commonClass)}
          onAnimationIteration={() => setIdx((idx + 1) % announcements.length)}
        >
          {message}
        </div>
      </div>
      <HorizontalSplitter/>
    </>
  );
};
