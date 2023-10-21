export const mimeTypesOfImage = [
  'image/jpeg',
  'image/png',
] as const;

export type MimeTypesOfImage = typeof mimeTypesOfImage[number];

export type MimeTypes = MimeTypesOfImage;
