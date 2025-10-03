import {FileRef} from '@spinach/next/types/input/fileRef';


export type InputFileCommonProps = {
  id: string,
  title: string,
  onFileSelected: (data: FileRef | null) => void,
  onFileTypeIncorrect: (fileType: string) => void,
  className?: string,
  classOfTitle?: string,
  disabled?: boolean,
};
