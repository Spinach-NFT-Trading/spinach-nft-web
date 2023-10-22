import React from 'react';

import clsx from 'clsx';


type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> & {
  id: string,
  type: React.HTMLInputTypeAttribute,
  value: string | number | readonly string[] | undefined,
  placeholder: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  inputClassName?: string,
  wrapperClassName?: string,
};

export const InputFloatingLabel = ({
  id, type, value, placeholder, onChange, inputClassName, wrapperClassName, ...props
}: Props) => {
  return (
    <div className={clsx('flex flex-col-reverse', wrapperClassName)}>
      <input
        type={type} id={id} value={value} onChange={onChange}
        className={clsx(
          'border-b border-slate-500 bg-slate-200 text-slate-900 disabled:text-slate-500',
          'peer w-full rounded-lg p-1 focus:outline-none',
          inputClassName,
        )}
        placeholder=" "
        {...props}
      />
      <label
        htmlFor={id}
        className={clsx(
          'whitespace-nowrap bg-transparent text-sm',
          'text-slate-300 peer-invalid:text-red-400 peer-focus:text-blue-400 peer-focus:peer-invalid:text-amber-500',
        )}
      >
        {placeholder}
      </label>
    </div>
  );
};
