import {ImageProps} from 'next/image';


export type NextImageProps = Omit<ImageProps, 'fill' | 'title'> & {
  noCover?: boolean,
};
