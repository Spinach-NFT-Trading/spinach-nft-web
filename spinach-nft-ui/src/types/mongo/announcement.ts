export const announcementLevels = [
  'info',
  'ok',
  'warning',
  'alert',
] as const;

export type AnnouncementLevel = typeof announcementLevels[number];

// Check `addAnnouncementDataValidation()` for data validation
export type Announcement = {
  message: string,
  level: AnnouncementLevel,
  expiry?: string,
  order?: number,
};
