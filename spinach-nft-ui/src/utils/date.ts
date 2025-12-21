export const getIanaTimezone = (): string => Intl.DateTimeFormat().resolvedOptions().timeZone;
