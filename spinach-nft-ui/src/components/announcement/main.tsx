import React from 'react';

import {AnnouncementsClient} from '@/components/announcement/client';
import {AnnouncementProps} from '@/components/announcement/type';
import {getAllAnnouncements} from '@/controller/announcement';


export const Announcements = (props: AnnouncementProps) => {
  const announcements = React.use(getAllAnnouncements());

  if (!announcements.length) {
    return <></>;
  }

  return <AnnouncementsClient announcements={announcements} {...props}/>;
};
