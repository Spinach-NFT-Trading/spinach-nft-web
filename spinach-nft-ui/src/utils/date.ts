// eslint-disable-next-line new-cap
export const getIanaTimezone = (): string => Intl.DateTimeFormat().resolvedOptions().timeZone;
