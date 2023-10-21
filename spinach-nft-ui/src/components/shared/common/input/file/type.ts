export type InputFileCommonProps = {
  id: string,
  title: string,
  onFileSelected: (data: string | null) => void,
  onFileTypeIncorrect: (fileType: string) => void,
  className?: string,
  disabled?: boolean,
};
