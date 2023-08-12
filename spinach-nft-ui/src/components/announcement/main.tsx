import React from 'react';

import {AnnouncementsClient} from '@spinach/next/components/announcement/client';
import {AnnouncementProps} from '@spinach/next/components/announcement/type';
import {getAllAnnouncements} from '@spinach/next/controller/announcement';


export const Announcements = (props: AnnouncementProps) => {
  const announcements = React.use(getAllAnnouncements());

  if (!announcements.length) {
    return <></>;
  }

  return <AnnouncementsClient announcements={announcements} {...props}/>;
};
