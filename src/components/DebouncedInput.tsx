import { useEffect, useState } from 'react';

export interface DebouncedInputWithIconProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
  > {
  value: string;
  onChange: (value: string) => void;
  debounce?: number;
  icon: string;
}

export default function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  icon,
  ...props
}: DebouncedInputWithIconProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <div className="relative">
      {/* Icon */}
      <span className="left-2 text-gray-500 absolute top-1/2 -translate-y-1/2">
        {icon}
      </span>

      <input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`pl-8 pr-2 py-2 rounded font-normal shadow w-full border focus:ring-2 focus:outline-none ${
          props.className ?? ''
        }`}
      />
    </div>
  );
}
