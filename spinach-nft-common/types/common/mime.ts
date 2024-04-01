import {Static, TString, Type} from '@sinclair/typebox';


export const mimeTypesOfImage = [
  'image/jpeg',
  'image/png',
] as const;

interface TMimeTypesOfImage extends TString {
  static: typeof mimeTypesOfImage[number];
}

export const MimeTypesOfImageSchema = Type.Unsafe<Static<TMimeTypesOfImage>>(Type.String({minLength: 1}));

export type MimeTypesOfImage = Static<typeof MimeTypesOfImageSchema>;

export type MimeTypes = MimeTypesOfImage;
