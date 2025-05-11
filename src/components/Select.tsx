import { forwardRef, SelectHTMLAttributes, useEffect, useState } from 'react';
import { mergeClasses } from '../utils/tailwind.util';
import Input from './Input';

interface Option {
  id: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id?: string;
  label?: string;
  placeholder?: string | undefined;
  options: Option[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function (
  { label, id, placeholder = '', options, ...props }: SelectProps,
  ref
) {
  const [selectedValue, setSelectedValue] = useState(placeholder);

  useEffect(() => {
    // console.log(ref);
  }, []);

  const onchange = (e: any) => {
    setSelectedValue(() => e.target.value);
    console.log('changed');
  };

  return (
    <div className="flex flex-col">
      {label?.length && (
        <label htmlFor={id?.length ? id : ''}>{label.length && label}</label>
      )}
      <select
        {...props}
        value={selectedValue} // <-- Explicitly set the value from state
        className={mergeClasses(
          `rounded-md border-gray-300 px-4 py-2 focus:ring-blue-400 appearance-none border-1 focus:ring-2 focus:outline-none`,
          props.className
        )}
        ref={ref}
        onChange={onchange}
      >
        <option value={placeholder} disabled hidden>
          {placeholder}
        </option>
        <option value={placeholder} disabled>
          <Input label="מחלקה" id="select-input" />
        </option>

        {options.map((option) => (
          <option key={option.id} value={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
