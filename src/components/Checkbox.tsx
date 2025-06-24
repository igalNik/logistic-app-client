import {
  ChangeEventHandler,
  HTMLAttributes,
  useCallback,
  useState,
} from 'react';
import { mergeClasses } from '../utils/tailwind.util';

interface CheckboxProps
  extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  checked?: boolean;
  onChange?: (value: boolean) => void;
}

function Checkbox({
  label,
  id,
  checked = false,
  onChange,
  ...props
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState<boolean>(!!checked); // default checked

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      console.log(e.target.checked);

      setIsChecked(() => e.target.checked);
      if (onChange) {
        onChange(e.target.checked);
      }
    },
    [onChange]
  );

  return (
    <label
      htmlFor={id}
      className={mergeClasses(
        props.className,
        'text-md gap-2 rounded px-2 h-8 py-0.5 flex w-full cursor-pointer items-center justify-start transition-colors duration-200'
      )}
    >
      <input
        {...props}
        checked={isChecked}
        id={id}
        type="checkbox"
        onChange={handleChange}
        className="w-5 h-5 rounded border-gray-300 checked:bg-blue-500 text-white before:text-white before:text-sm before:font-bold focus:ring-blue-500 focus:ring-opacity-30 focus:ring-opacity-40 flex cursor-pointer appearance-none items-center justify-center border ring-offset-2 transition-all before:opacity-0 before:content-['✓'] checked:border-none checked:content-['✓'] checked:before:opacity-100 focus:ring-2 focus:inset-ring-1 focus:outline-none"
      />
      <label htmlFor={id} className="cursor-pointer">
        {label}
      </label>
    </label>
  );
}

export default Checkbox;
