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
          'peer w-full bg-transparent text-slate-800 focus:outline-none',
          'border-b border-slate-500',
          inputClassName,
        )}
        placeholder=" "
        {...props}
      />
      <label
        htmlFor={id}
        className={clsx(
          'whitespace-nowrap bg-transparent text-sm',
          'text-slate-600 peer-invalid:text-red-500 peer-focus:text-blue-700 peer-focus:peer-invalid:text-amber-600',
        )}
      >
        {placeholder}
      </label>
    </div>
  );
};
