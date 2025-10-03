import React from 'react';

import DocumentArrowUpIcon from '@heroicons/react/24/outline/DocumentArrowUpIcon';
import {MimeTypes} from '@spinach/common/types/common/mime';
import {isMimeTypesOfImage} from '@spinach/common/utils/mime';
import {clsx} from 'clsx';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {InputFileCommonProps} from '@spinach/next/components/shared/common/input/file/type';


type Props = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'id' | 'accept' | 'type' | 'onChange'
> & InputFileCommonProps & {
  accept: MimeTypes[],
};

export const InputFile = ({
  id,
  title,
  accept,
  onFileSelected,
  onFileTypeIncorrect,
  classOfTitle,
  ...props
}: Props) => {
  const {className} = props;
  const [filePath, setFilePath] = React.useState<string | null>(null);

  // `<label>` cannot go first per tailwindcss doc:
  // https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-sibling-state
  return (
    <Flex className={clsx('gap-0.5', className)}>
      <div className={clsx('text-sm', classOfTitle)}>{title}</div>
      <input
        {...props}
        id={id}
        accept={accept.join(',')}
        type="file"
        className="peer hidden"
        onChange={async ({target}) => {
          const file = target.files?.item(0);
          if (!file) {
            setFilePath(null);
            onFileSelected(null);
            return;
          }

          const contentType = file.type;
          if (!isMimeTypesOfImage(contentType)) {
            onFileTypeIncorrect(file.type);
            return;
          }

          setFilePath(file.name);
          onFileSelected({file, contentType});
        }}
      />
      <label htmlFor={id} className={clsx(
        'button-clickable-bg peer-disabled:button-disabled',
        'flex w-full cursor-pointer flex-row items-center self-stretch overflow-auto p-1.5',
      )}>
        <div className="size-6 shrink-0">
          <DocumentArrowUpIcon/>
        </div>
        <div className="truncate">
          {filePath || '-'}
        </div>
      </label>
    </Flex>
  );
};
