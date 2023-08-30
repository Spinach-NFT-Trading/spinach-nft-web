import {AnnouncementLevel} from '@spinach/next/types/mongo/announcement';


export const announcementTextClasses: {[level in AnnouncementLevel]: string} = {
  info: 'text-blue-700',
  ok: 'text-emerald-700',
  warning: 'text-yellow-700',
  alert: 'text-red-700',
};
