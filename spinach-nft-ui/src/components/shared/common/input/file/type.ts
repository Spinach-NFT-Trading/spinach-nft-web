import {BinaryData} from '@spinach/common/types/common/binary';


export type InputFileCommonProps = {
  id: string,
  title: string,
  onFileSelected: (data: BinaryData | null) => void,
  onFileTypeIncorrect: (fileType: string) => void,
  className?: string,
  disabled?: boolean,
};
