import React from 'react';

import DocumentArrowUpIcon from '@heroicons/react/24/outline/DocumentArrowUpIcon';
import {clsx} from 'clsx';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {InputFileCommonProps} from '@spinach/next/components/shared/common/input/file/type';
import {MimeTypes} from '@spinach/next/types/mime';


type Props = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'id' | 'accept' | 'type' | 'onChange'
> & InputFileCommonProps & {
  accept: MimeTypes[],
};

export const InputFile = ({id, title, accept, onFileSelected, onFileTypeIncorrect, ...props}: Props) => {
  const {className} = props;
  const [filePath, setFilePath] = React.useState<string | null>(null);

  // `<label>` cannot go first per tailwindcss doc:
  // https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-sibling-state
  return (
    <Flex className={clsx('gap-0.5', className)}>
      <div className="text-sm">{title}</div>
      <input
        {...props}
        id={id}
        accept={accept.join(',')}
        type="file"
        className="peer hidden"
        onChange={async ({target}) => {
          const files = target.files;

          if (!files) {
            onFileSelected(null);
            return;
          }

          const file = files.item(0);
          if (!file) {
            return;
          }

          if (!accept.includes(file.type as MimeTypes)) {
            onFileTypeIncorrect(file.type);
            return;
          }

          setFilePath(file.name);
          onFileSelected(await file.text());
        }}
      />
      <label htmlFor={id} className={clsx(
        'button-clickable-bg peer-disabled:button-disabled',
        'flex w-full cursor-pointer flex-row items-center self-stretch overflow-auto p-1.5',
      )}>
        <div className="h-6 w-6 shrink-0">
          <DocumentArrowUpIcon/>
        </div>
        <div className="truncate">
          {filePath || '-'}
        </div>
      </label>
    </Flex>
  );
};
