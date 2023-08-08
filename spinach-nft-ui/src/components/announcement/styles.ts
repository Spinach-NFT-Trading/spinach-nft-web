import {AnnouncementLevel} from '@/types/mongo/announcement';


export const announcementTextClasses: {[level in AnnouncementLevel]: string} = {
  info: 'text-blue-700 dark:text-cyan-300',
  ok: 'text-emerald-700 dark:text-green-300',
  warning: 'text-yellow-700 dark:text-amber-300',
  alert: 'text-red-700 dark:text-red-300',
};
